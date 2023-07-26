import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useTheme } from "@rneui/themed";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { getUserNovels, updateNovelStatus } from "../../api/novels";
import useCall from "../../api/useCall";
import { WorkshopNovelGrid, WorkshopTabs } from "../../components";
import { useSession } from "../../providers";
import { Action, RootStackParamList } from "../../types";
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
    const { session: { userProfile: { userId } } } = useSession();
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

    const commonActions: Array<Action> = [
        {
            icon: "trash",
            title: "Supprimer",
            onPress: () => { },
        },
        {
            icon: "pen",
            title: "Editer",
            onPress: (novel: Novel) => { navigation.navigate("NovelForm", { mode: "edit", novel }) },
        },
    ]

    const publishedActions: Array<Action> = [
        {
            icon: "archive",
            title: "Archiver",
            onPress: async (novel: Novel) => {
                await callUpdateNovelStatus({ novelId: novel.id, status: "archived" });
            },
        }, {
            icon: "eye-slash",
            title: "Dépublier",
            onPress: async (novel: Novel) => {
                await callUpdateNovelStatus({ novelId: novel.id, status: "draft" });
            },
        },
        ...commonActions
    ];

    const draftActions: Array<Action> = [{
        icon: "eye",
        title: "Publier",
        onPress: async (novel: Novel) => {
            await callUpdateNovelStatus({ novelId: novel.id, status: "published" });
        },
    },
    {
        icon: "archive",
        title: "Archiver",
        onPress: async (novel: Novel) => {
            await callUpdateNovelStatus({ novelId: novel.id, status: "archived" });
        },
    },
    ...commonActions
    ];

    const archivedActions: Array<Action> = [
        {
            icon: "eye",
            title: "Publier",
            onPress: async (novel: Novel) => {
                await callUpdateNovelStatus({ novelId: novel.id, status: "published" });
            },

        },
        ...commonActions
    ];

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
                        refreshing={isLoading}
                        onRefresh={() => call({ userId })}
                        actions={actionFilters[selectedTab]}
                        novels={novels.filter((novel) => filters[selectedTab] === novel.status)}
                        navigation={navigation} onLastItemPress={() => {
                            navigation.navigate("NovelForm", { mode: "create" });
                        }}
                    />
                </View>
            </View>
        </View>
    )
}