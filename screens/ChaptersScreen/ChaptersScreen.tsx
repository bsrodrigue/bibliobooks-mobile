import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { View } from "react-native";
import { WorkshopTabs } from "../../components";
import { novels } from "../../mock";
import { Novel, RootStackParamList } from "../../types";

type ChaptersScreenProps = NativeStackScreenProps<RootStackParamList, 'Chapters'>;

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

export default function ChaptersScreen({ navigation }: ChaptersScreenProps) {
    const [selectedItem, setSelectedItem] = useState(tabs[0].label);
    const filtered = novels.filter((novel) => novel.status === filters[selectedItem]);
    const data: Novel[] = [
        ...filtered, { last: true }
    ]

    return (
        <View style={{ flex: 1 }}>
            <WorkshopTabs items={tabs} selectedItem={selectedItem} onPressTab={(label) => setSelectedItem(label)} />

        </View>
    )
}