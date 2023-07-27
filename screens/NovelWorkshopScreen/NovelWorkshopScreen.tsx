import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useTheme } from "@rneui/themed";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { deleteNovel, getUserNovels, updateNovelStatus } from "../../api/novels";
import useCall from "../../api/useCall";
import { WorkshopNovelGrid, WorkshopTabs } from "../../components";
import { useSession } from "../../providers";
import { RootStackParamList } from "../../types";
import { Novel } from "../../types/models";

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

type NovelWorkshopScreenProps = NativeStackScreenProps<RootStackParamList, 'NovelWorkshop'>;

export default function NovelWorkshopScreen({ navigation }: NovelWorkshopScreenProps) {
    const [novels, setNovels] = useState<Array<Novel>>([]);
    const [novelToBeDeleted, setNovelToBeDeleted] = useState<Novel>(null)
    const { session: { userProfile: { userId } } } = useSession();
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
    const { call, isLoading } = useCall(getUserNovels, {
        onSuccess(result) {
            setNovels(result)
        },
    });

    const { call: callUpdateNovelStatus, isLoading: updateNovelIsLoading } = useCall(updateNovelStatus, {
        onSuccess(result) {
            call({ userId });
        },
    });

    const { call: callDeleteNovel, isLoading: isDeleteNovelLoading } = useCall(deleteNovel);

    const loading = isLoading || updateNovelIsLoading;

    const onArchive = async (novel: Novel) => await callUpdateNovelStatus({ novelId: novel.id, status: "archived" })
    const onPublish = async (novel: Novel) => await callUpdateNovelStatus({ novelId: novel.id, status: "published" })
    const onUnPublish = async (novel: Novel) => await callUpdateNovelStatus({ novelId: novel.id, status: "draft" })
    const onEdit = (novel: Novel) => navigation.navigate("NovelForm", { mode: "edit", novel });
    const onDelete = (novel: Novel) => {
        setNovelToBeDeleted(novel);
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
            onPress: onEdit,
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

    const [selectedTab, setSelectedTab] = useState(tabs[0].label);
    const { theme: { colors: { primary } } } = useTheme();

    useEffect(() => {
        call({ userId })
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <WorkshopTabs items={tabs} selectedItem={selectedTab} onPressTab={(label) => setSelectedTab(label)} />
            <View style={{ flexDirection: "row", justifyContent: "center", flex: 1, paddingHorizontal: 20 }}>
                <View style={{ alignItems: "flex-start", flex: 1, }}>
                    <WorkshopNovelGrid
                        refreshing={loading}
                        onRefresh={() => call({ userId })}
                        actions={[...actionFilters[selectedTab], ...commonActions]}
                        novels={novels.filter((novel) => filters[selectedTab] === novel.status)}
                        navigation={navigation} onLastItemPress={() => {
                            navigation.navigate("NovelForm", { mode: "create" });
                        }}
                        onBackdropPress={() => {
                            setNovelToBeDeleted(null);
                            setIsConfirmationOpen(false)
                        }
                        }
                        confirm={isConfirmationOpen}
                        loading={isDeleteNovelLoading}
                        onConfirm={async () => {
                            await callDeleteNovel({ novelId: novelToBeDeleted.id });
                            call({ userId })
                            setIsConfirmationOpen(false)
                        }}
                    />
                </View>
            </View>
        </View>
    )
}