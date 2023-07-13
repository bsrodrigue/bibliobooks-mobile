import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, View } from "react-native";
import { WorkshopNovelGrid } from "../../components";
import { novels } from "../../mock";
import { Novel, RootStackParamList } from "../../types";

const data: Novel[] = [
    ...novels, { last: true },
]

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 10,
        justifyContent: "center",
        alignItems: "center",
    },
});

type PublicationsScreenProps = NativeStackScreenProps<RootStackParamList, 'Publications'>;

export default function PublicationsScreen({ navigation }: PublicationsScreenProps) {

    const actions = [
        {
            icon: "archive",
            title: "Archiver",
            onPress: () => { },
        }, {
            icon: "trash",
            title: "Supprimer",
            onPress: () => { },
        },
        {
            icon: "pen",
            title: "Editer",
            onPress: () => { },
        },
    ];

    return (
        <View style={styles.container}>
            <WorkshopNovelGrid actions={actions} novels={data} navigation={navigation} />
        </View>
    )
}