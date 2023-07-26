import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Divider, FAB, Icon } from "@rneui/base";
import { useTheme } from "@rneui/themed";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from "react-native";
import { getNovelChapters } from "../../api/novels";
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
    const { session: { userProfile: { userId } } } = useSession();
    const { call, isLoading } = useCall(getNovelChapters, {
        onSuccess(result) {
            setChapters(result)
        },
    });
    const [selectedTab, setSelectedTab] = useState(tabs[0].label);
    const [actionsIsVisible, setActionsIsVisible] = useState(false);
    const { theme: { colors: { primary } } } = useTheme();

    const commonActions = [
        {
            icon: "trash",
            title: "Supprimer",
            onPress: () => { },
        },
        {
            icon: "pen",
            title: "Editer",
            onPress: () => { },
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

    useEffect(() => {
        call({ novelId: novel.id })
    }, []);

    return (
        <>
            <WorkshopTabs items={tabs} selectedItem={selectedTab} onPressTab={(label) => setSelectedTab(label)} />
            <View style={{ flexDirection: "row", justifyContent: "center", flex: 1, paddingHorizontal: 20, paddingTop: 40, backgroundColor: "white" }}>
                {
                    isLoading ? (
                        <ActivityIndicator color={primary} size="large" />
                    ) : (
                        <FlatList
                            data={chapters.filter((chapter) => filters[selectedTab] === novel.status)}
                            ListEmptyComponent={<View style={{ flex: 1, justifyContent: "center", alignItems: "center", opacity: 0.5 }}>
                                <Text style={{ fontFamily: "Quicksand-700", fontSize: 16 }}>{novel.title}</Text>
                                <Text style={{ fontFamily: "Quicksand-500", fontSize: 16 }}>n'a aucun chapitre...</Text>
                            </View>}
                            contentContainerStyle={{ gap: 15 }}
                            ItemSeparatorComponent={() => <Divider style={{ marginTop: 10, opacity: 0.5, width: "60%" }} />}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ index, item: { title } }) => (
                                <TouchableOpacity
                                    onLongPress={() => {
                                        setActionsIsVisible(true);
                                    }}
                                    style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                    <View style={{ gap: 5 }}>
                                        <Text style={{ maxWidth: 100, fontFamily: "Quicksand-700", fontSize: 14 }}>{title}</Text>
                                        <Text style={{ fontFamily: "Quicksand-500", opacity: 0.5 }}>1253 mots</Text>
                                    </View>
                                    <Text style={{ opacity: 0.5, fontSize: 12, fontStyle: "italic" }}>Il y a trois (3) jours</Text>
                                </TouchableOpacity>
                            )} />
                    )
                }
            </View >
            <FAB
                placement="right"
                color={primary}
                icon={<Icon color="white" name="plus" type="font-awesome-5" />}
                onPress={() => navigation.navigate("ChapterForm", { mode: "create", novel })}
            />
            <ActionBottomSheet
                actions={actionFilters[selectedTab]}
                isVisible={actionsIsVisible}
                onBackdropPress={() => setActionsIsVisible(false)} />
        </>
    )
}