import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { WorkshopNovelGrid, WorkshopTabs } from "../../components";
import { RootStackParamList } from "../../types";
import { Novel } from "../../types/models";
import useCall from "../../api/useCall";
import { getUserNovels } from "../../api/novels";
import { useSession } from "../../providers";
import { useTheme } from "@rneui/themed";

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

    const commonActions = [
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

    const publishedActions = [
        {
            icon: "archive",
            title: "Archiver",
            onPress: () => { },
        }, {
            icon: "eye-slash",
            title: "Dépublier",
            onPress: () => { },
        },
        ...commonActions
    ];

    const draftActions = [{
        icon: "eye",
        title: "Publier",
        onPress: () => { },
    },
    {
        icon: "archive",
        title: "Archiver",
        onPress: () => { },
    },
    ...commonActions
    ];

    const archivedActions = [
        {
            icon: "eye",
            title: "Publier",
            onPress: () => { },
        },
        ...commonActions
    ];


    const actionFilters = {
        "Publications": publishedActions,
        "Brouillons": draftActions,
        "Archives": archivedActions,
    }

    const [selectedItem, setSelectedItem] = useState(tabs[0].label);
    const { session: { userProfile: { userId } } } = useSession();
    const { theme: { colors: { primary } } } = useTheme();
    const [novels, setNovels] = useState<Array<Novel>>([]);
    const { call, isLoading } = useCall(getUserNovels, {
        onSuccess(result) {
            setNovels(result);
        },
    });

    useEffect(() => {
        call({ userId })
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <WorkshopTabs items={tabs} selectedItem={selectedItem} onPressTab={(label) => setSelectedItem(label)} />
            <View style={{ flexDirection: "row", justifyContent: "center", flex: 1, paddingHorizontal: 20 }}>
                <View style={{ alignItems: "flex-start", flex: 1, }}>
                    {
                        isLoading ? (
                            <View style={{ justifyContent: "center", alignItems: "center", flex: 1, width: "100%" }} >
                                <ActivityIndicator color={primary} size="large" />
                            </View>
                        ) : (
                            <WorkshopNovelGrid actions={actionFilters[selectedItem]} novels={novels} navigation={navigation} onLastItemPress={() => {
                                navigation.navigate("NovelForm", { mode: "create" });
                            }} />
                        )
                    }
                </View>
            </View>
        </View>
    )
}