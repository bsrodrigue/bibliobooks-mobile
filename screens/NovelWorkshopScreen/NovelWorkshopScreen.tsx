import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { View } from "react-native";
import { WorkshopNovelGrid, WorkshopTabs } from "../../components";
import { Novel, RootStackParamList } from "../../types";

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
    return (
        <>
            <WorkshopTabs items={tabs} selectedItem={selectedItem} onPressTab={(label) => setSelectedItem(label)} />
            <View style={{ flexDirection: "row", justifyContent: "center", flex: 1, paddingHorizontal: 20 }}>
                <View style={{ alignItems: "flex-start", flex: 1, }}>
                    <WorkshopNovelGrid actions={actionFilters[selectedItem]} novels={[]} navigation={navigation} onLastItemPress={() => {
                        navigation.navigate("NovelForm", { mode: "create" });
                    }} />
                </View>
            </View>
        </>
    )
}