import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { View } from "react-native";
import { WorkshopNovelGrid, WorkshopTabs } from "../../components";
import { novels } from "../../mock";
import { Novel, RootStackParamList } from "../../types";

type WorkshopScreenProps = NativeStackScreenProps<RootStackParamList, 'Workshop'>;

const tabs = [
    { label: "Publications", },
    { label: "Brouillons", },
    { label: "Archives", },
];

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

const filters = {
    "Publications": "published",
    "Brouillons": "draft",
    "Archives": "archived",
}

const actionFilters = {
    "Publications": publishedActions,
    "Brouillons": draftActions,
    "Archives": archivedActions,
}

export default function WorkshopScreen({ navigation }: WorkshopScreenProps) {
    const [selectedItem, setSelectedItem] = useState(tabs[0].label);
    const filtered = novels.filter((novel) => novel.status === filters[selectedItem]);
    const data: Novel[] = [
        ...filtered, { last: true }
    ]

    return (
        <View style={{ flex: 1 }}>
            <WorkshopTabs items={tabs} selectedItem={selectedItem} onPressTab={(label) => setSelectedItem(label)} />
            <View style={{ flexDirection: "row", justifyContent: "center", flex: 1, paddingHorizontal: 20 }}>
                <View style={{ alignItems: "flex-start", flex: 1, }}>
                    <WorkshopNovelGrid actions={actionFilters[selectedItem]} novels={data} navigation={navigation} />
                </View>
            </View>
        </View>
    )
}