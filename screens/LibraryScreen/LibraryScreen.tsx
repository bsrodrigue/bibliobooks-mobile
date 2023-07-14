import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, View } from "react-native";
import { NovelGrid } from "../../components";
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

type NoveltyScreenProps = NativeStackScreenProps<RootStackParamList, 'Novelty'>;

export default function NoveltyScreen({ navigation }: NoveltyScreenProps) {
    return (
        <View style={styles.container}>
            <NovelGrid novels={data} onNovelPress={() => { }} onLastItemPress={() => { }} />
        </View>
    )
}