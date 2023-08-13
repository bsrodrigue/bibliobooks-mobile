import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Divider, FAB, Icon } from "@rneui/base";
import { useTheme } from "@rneui/themed";
import { useEffect, useState } from "react";
import { FlatList, RefreshControl, Text, TouchableOpacity, View } from "react-native";
import { updateChapterStatus } from "../../api/chapters";
import useCall from "../../api/useCall";
import { ActionBottomSheet, WorkshopTabs } from "../../components";
import { mom } from "../../lib/moment";
import { getWordCount } from "../../lib/utils";
import { useWorkshop } from "../../providers/WorkshopProvider";
import { RootStackParamList } from "../../types";
import { Chapter, NovelStatus, WorkshopNovel } from "../../types/models";
import { useChapterWorkshop } from "../../hooks/api/workshop";

const tabs = [
    { label: "Publications", },
    { label: "Brouillons", },
    { label: "Archives", },
];

const filters: Record<string, NovelStatus> = {
    "Publications": "PUBLISHED",
    "Brouillons": "DRAFT",
    "Archives": "ARCHIVED",
}

type ChapterWorkshopScreenProps = NativeStackScreenProps<RootStackParamList, 'ChapterWorkshop'>;

export default function ChapterWorkshopScreen({ navigation, route: { params: { novelId } } }: ChapterWorkshopScreenProps) {
    const { workshopNovels, fetchWorkshopNovels, isLoading, updateWorkshopChapter, updateWorkshopNovel } = useWorkshop();
    const { del, isDelLoading } = useChapterWorkshop();
    const [chapters, setChapters] = useState<Array<Chapter>>([]);
    const [chapterToBeDeleted, setChapterToBeDeleted] = useState<Chapter>(null);
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
    const [novel, setNovel] = useState<WorkshopNovel>(null);
    const [chapter, setChapter] = useState<Chapter>(null);

    const { call, isLoading: isUpdateChapterStatusLoading } = useCall(updateChapterStatus, {
        onSuccess(result) {
            updateWorkshopChapter(novel, chapter.id, result);
        },
    });

    const refreshing = isLoading || isUpdateChapterStatusLoading || isDelLoading;
    const [selectedTab, setSelectedTab] = useState(tabs[0].label);
    const [actionsIsVisible, setActionsIsVisible] = useState(false);
    const { theme: { colors: { primary } } } = useTheme();

    const onPublish = async (chapter: Chapter) => {
        await call({ chapterId: chapter.id, status: "PUBLISHED" })
        setSelectedTab(tabs[0].label);
    }

    const onUnPublish = async (chapter: Chapter) => {
        await call({ chapterId: chapter.id, status: "DRAFT" })
        setSelectedTab(tabs[1].label);
    }

    const onArchive = async (chapter: Chapter) => {
        await call({ chapterId: chapter.id, status: "ARCHIVED" })
        setSelectedTab(tabs[2].label);
    }

    const onEdit = (chapter: Chapter) => navigation.navigate("ChapterForm", { mode: "edit", novel: novel, chapter });

    const onDelete = (chapter: Chapter) => {
        setChapterToBeDeleted(chapter);
        setIsConfirmationOpen(true);
    }

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
            onPress: onDelete,
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
        const novel = workshopNovels.filter((novel) => novel.id === novelId)[0];
        setNovel(novel);
        setChapters(novel.chapters);
    }, [workshopNovels]);

    return (
        <>
            <WorkshopTabs items={tabs} selectedItem={selectedTab} onPressTab={(label) => setSelectedTab(label)} />
            <View style={{ flexDirection: "row", justifyContent: "center", flex: 1, paddingHorizontal: 20, paddingTop: 40, backgroundColor: "white" }}>
                <FlatList
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={fetchWorkshopNovels} />}
                    data={chapters.filter((chapter) => filters[selectedTab] === chapter.status)}
                    ListEmptyComponent={<View style={{ flex: 1, justifyContent: "center", alignItems: "center", opacity: 0.5 }}>
                        <Text style={{ fontFamily: "Quicksand-700", fontSize: 16 }}>{novel?.title}</Text>
                        <Text style={{ fontFamily: "Quicksand-500", fontSize: 16 }}>n'a aucun chapitre dans cette section</Text>
                    </View>}
                    contentContainerStyle={{ gap: 15 }}
                    ItemSeparatorComponent={() => <Divider style={{ marginTop: 10, opacity: 0.5, width: "60%" }} />}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ index, item }) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => {
                                navigation.navigate("ChapterPreview", { chapter: item })
                            }}
                            onLongPress={() => {
                                setChapter(item)
                                setActionsIsVisible(true);
                            }}
                            style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                            <View style={{ gap: 5 }}>
                                <Text
                                    numberOfLines={3}
                                    style={{
                                        maxWidth: 100,
                                        fontFamily: "Quicksand-700", fontSize: 14
                                    }}>{item.title}</Text>
                                <Text style={{ fontFamily: "Quicksand-500", opacity: 0.5 }}>{getWordCount(item.body)} mots</Text>
                            </View>
                            <Text style={{ opacity: 0.5, fontSize: 12, fontStyle: "italic" }}>{mom(item.updatedAt).fromNow()}</Text>
                        </TouchableOpacity>
                    )} />
            </View >
            <FAB
                placement="right"
                color={primary}
                icon={<Icon color="white" name="plus" type="font-awesome-5" />}
                onPress={() => navigation.navigate("ChapterForm", { mode: "create", novel: novel })}
            />
            <ActionBottomSheet
                item={chapter}
                actions={[...actionFilters[selectedTab], ...commonActions]}
                isVisible={actionsIsVisible}
                confirm={isConfirmationOpen}
                loading={refreshing}
                onActionFinished={() => setActionsIsVisible(false)}
                onConfirm={async () => {
                    await del({ chapterId: chapterToBeDeleted.id });
                    novel.chapters = novel.chapters.filter((chapter) => chapter.id !== chapterToBeDeleted.id);
                    updateWorkshopNovel(novel.id, novel);
                    setChapterToBeDeleted(null);
                    setIsConfirmationOpen(false)
                    setActionsIsVisible(false);
                }}
                onBackdropPress={() => {
                    setChapterToBeDeleted(null);
                    setIsConfirmationOpen(false)
                    setActionsIsVisible(false);
                }} />
        </>// 
    )
}