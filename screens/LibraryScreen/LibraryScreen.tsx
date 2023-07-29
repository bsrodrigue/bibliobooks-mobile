import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, View } from "react-native";
import { NovelGrid } from "../../components";
import { RootStackParamList } from "../../types";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
});

type NoveltyScreenProps = NativeStackScreenProps<RootStackParamList, 'Novelty'>;

export default function NoveltyScreen({ navigation }: NoveltyScreenProps) {
    return (
        <View style={styles.container}>
            <NovelGrid novels={[]} onNovelPress={() => { }} onLastItemPress={() => {
                navigation.navigate("Novelty");
            }} />
        </View>
    )
}