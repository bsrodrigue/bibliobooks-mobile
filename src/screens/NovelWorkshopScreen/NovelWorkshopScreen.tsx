import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { TabView } from "@rneui/base";
import { useRef, useState } from "react";
import { View } from "react-native";
import { deleteNovel, updateNovelStatus } from "../../api/novels";
import useCall from "../../api/useCall";
import { WorkshopNovelGrid, WorkshopTabs } from "../../components";
import { useWorkshop } from "../../providers/WorkshopProvider";
import { RootStackParamList } from "../../types";
import { Novel } from "../../types/models";

const tabs = [
    { label: "Publications", },
    { label: "Brouillons", },
    { label: "Archives", },
];

const filters = {
    "Publications": "PUBLISHED",
    "Brouillons": "DRAFT",
    "Archives": "ARCHIVED",
}

type NovelWorkshopScreenProps = NativeStackScreenProps<RootStackParamList, 'NovelWorkshop'>;

export default function NovelWorkshopScreen({ navigation }: NovelWorkshopScreenProps) {
    const { workshopNovels, isLoading, fetchWorkshopNovels } = useWorkshop();
    const [novelToBeDeleted, setNovelToBeDeleted] = useState<Novel>(null)
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
    const _currentTabRef = useRef("Publications");

    const { call: callUpdateNovelStatus, isLoading: updateNovelIsLoading } = useCall(updateNovelStatus, {
        onSuccess() {
            fetchWorkshopNovels()
        },
    });

    const { call: callDeleteNovel, isLoading: isDeleteNovelLoading } = useCall(deleteNovel);

    const loading = isLoading || updateNovelIsLoading || isDeleteNovelLoading;

    const onPublish = async (novel: Novel) => {
        await callUpdateNovelStatus({ novelId: novel.id, status: "PUBLISHED" })
        setSelectedTab(tabs[0].label)
    }

    const onUnPublish = async (novel: Novel) => {
        await callUpdateNovelStatus({ novelId: novel.id, status: "DRAFT" })
        setSelectedTab(tabs[1].label)
    }

    const onArchive = async (novel: Novel) => {
        await callUpdateNovelStatus({ novelId: novel.id, status: "ARCHIVED" })
        setSelectedTab(tabs[2].label)
    }

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

    return (
        <View style={{ flex: 1 }}>
            <WorkshopTabs items={tabs} selectedItem={selectedTab} onPressTab={(label) => setSelectedTab(label)} />
            <TabView
                minSwipeRatio={0.5}
                minSwipeSpeed={2.5}
                value={tabs.findIndex((tab) => tab.label === selectedTab)}
                onChange={(index) => {
                    setSelectedTab(tabs[index].label);
                }}>
                {
                    ["PUBLISHED", "DRAFT", "ARCHIVED"].map((status, index) => (
                        <TabView.Item key={index}
                            style={{ flexDirection: "row", justifyContent: "center", flex: 1, paddingHorizontal: 20 }}>
                            <View style={{ alignItems: "flex-start", flex: 1, }}>
                                <WorkshopNovelGrid
                                    refreshing={loading}
                                    onRefresh={fetchWorkshopNovels}
                                    actions={[...actionFilters[selectedTab], ...commonActions]}
                                    novels={workshopNovels.filter((novel) => status === novel.status)}
                                    navigation={navigation}
                                    onLastItemPress={() => {
                                        navigation.navigate("NovelForm", { mode: "create" });
                                    }}
                                    onBackdropPress={() => {
                                        setNovelToBeDeleted(null);
                                        setIsConfirmationOpen(false)
                                    }
                                    }
                                    confirm={isConfirmationOpen}
                                    loading={loading}
                                    onConfirm={async () => {
                                        await callDeleteNovel({ novelId: novelToBeDeleted.id });
                                        fetchWorkshopNovels()
                                        setIsConfirmationOpen(false)
                                    }}
                                />
                            </View>
                        </TabView.Item>
                    ))
                }

            </TabView>

        </View>
    )
}