import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Divider, FAB, Icon } from "@rneui/base";
import { useTheme } from "@rneui/themed";
import { useEffect, useState } from "react";
import { FlatList, RefreshControl, Text, TouchableOpacity, View } from "react-native";
import { getNovelChapters, updateChapterStatus } from "../../api/novels";
import useCall from "../../api/useCall";
import { ActionBottomSheet, WorkshopTabs } from "../../components";
import { useSession } from "../../providers";
import { RootStackParamList } from "../../types";
import { Chapter } from "../../types/models";

const tabs = [
    { label: "Publications", },
    { label: "Brouillons", },
    { label: "Archives", },
];

const filters = {
    "Publications": "published",
    "Brouillons": "draft",
    "Archives": "archived",
}

type ChapterWorkshopScreenProps = NativeStackScreenProps<RootStackParamList, 'ChapterWorkshop'>;

export default function ChapterWorkshopScreen({ navigation, route: { params: { novel } } }: ChapterWorkshopScreenProps) {
    const [chapters, setChapters] = useState<Array<Chapter>>([]);
    const [chapter, setChapter] = useState<Chapter>(null);
    const { session: { userProfile: { userId } } } = useSession();
    const { call, isLoading } = useCall(getNovelChapters, {
        onSuccess(result) {
            setChapters(result)
        },
    });
    const { call: callUpdateChapterStatus, isLoading: isUpdateChapterStatusLoading } = useCall(updateChapterStatus, {
        onSuccess(result) {
            call({ novelId: novel.id });
        },
    });
    const loading = isLoading || isUpdateChapterStatusLoading;
    const [selectedTab, setSelectedTab] = useState(tabs[0].label);
    const [actionsIsVisible, setActionsIsVisible] = useState(false);
    const { theme: { colors: { primary } } } = useTheme();

    const onArchive = async (chapter: Chapter) => await callUpdateChapterStatus({ chapterId: chapter.id, status: "archived" })
    const onPublish = async (chapter: Chapter) => await callUpdateChapterStatus({ chapterId: chapter.id, status: "published" })
    const onUnPublish = async (chapter: Chapter) => await callUpdateChapterStatus({ chapterId: chapter.id, status: "draft" })
    const onEdit = (chapter: Chapter) => navigation.navigate("ChapterForm", { mode: "edit", novel, chapter })

    const archiveAction = {
        icon: "archive",
        title: "Archiver",
        onPress: onArchive,
    }

    const unPublishAction = {
        icon: "eye-slash",
        title: "Dépublier",
        onPress: onUnPublish
    };

    const publishAction = {
        icon: "eye",
        title: "Publier",
        onPress: onPublish
    };

    const commonActions = [
        {
            icon: "trash",
            title: "Supprimer",
            onPress: () => { },
        },
        {
            icon: "pen",
            title: "Editer",
            onPress: onEdit
        },
    ]

    const publishedActions = [archiveAction, unPublishAction];
    const draftActions = [publishAction, archiveAction];
    const archivedActions = [publishAction];

    const actionFilters = {
        "Publications": publishedActions,
        "Brouillons": draftActions,
        "Archives": archivedActions,
    }

    useEffect(() => {
        call({ novelId: novel.id })
    }, []);

    return (
        <>
            <WorkshopTabs items={tabs} selectedItem={selectedTab} onPressTab={(label) => setSelectedTab(label)} />
            <View style={{ flexDirection: "row", justifyContent: "center", flex: 1, paddingHorizontal: 20, paddingTop: 40, backgroundColor: "white" }}>
                <FlatList
                    refreshControl={<RefreshControl refreshing={loading} onRefresh={() => call({ novelId: novel.id })} />}
                    data={chapters.filter((chapter) => filters[selectedTab] === chapter.status)}
                    ListEmptyComponent={<View style={{ flex: 1, justifyContent: "center", alignItems: "center", opacity: 0.5 }}>
                        <Text style={{ fontFamily: "Quicksand-700", fontSize: 16 }}>{novel.title}</Text>
                        <Text style={{ fontFamily: "Quicksand-500", fontSize: 16 }}>n'a aucun chapitre...</Text>
                    </View>}
                    contentContainerStyle={{ gap: 15 }}
                    ItemSeparatorComponent={() => <Divider style={{ marginTop: 10, opacity: 0.5, width: "60%" }} />}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ index, item }) => (
                        <TouchableOpacity
                            onLongPress={() => {
                                setChapter(item)
                                setActionsIsVisible(true);
                            }}
                            style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                            <View style={{ gap: 5 }}>
                                <Text style={{ maxWidth: 100, fontFamily: "Quicksand-700", fontSize: 14 }}>{item.title}</Text>
                                <Text style={{ fontFamily: "Quicksand-500", opacity: 0.5 }}>1253 mots</Text>
                            </View>
                            <Text style={{ opacity: 0.5, fontSize: 12, fontStyle: "italic" }}>Il y a trois (3) jours</Text>
                        </TouchableOpacity>
                    )} />
            </View >
            <FAB
                placement="right"
                color={primary}
                icon={<Icon color="white" name="plus" type="font-awesome-5" />}
                onPress={() => navigation.navigate("ChapterForm", { mode: "create", novel })}
            />
            <ActionBottomSheet
                item={chapter}
                actions={[...actionFilters[selectedTab], ...commonActions]}
                isVisible={actionsIsVisible}
                onBackdropPress={() => setActionsIsVisible(false)} />
        </>
    )
}