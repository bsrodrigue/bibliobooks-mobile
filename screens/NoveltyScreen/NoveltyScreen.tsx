import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, View } from "react-native";
import { NovelList } from "../../components";
import { novels } from "../../mock";
import { RootStackParamList } from "../../types";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        marginTop: 10
    },
});


type NoveltyScreenProps = NativeStackScreenProps<RootStackParamList, 'Novelty'>;

export default function NoveltyScreen({ navigation }: NoveltyScreenProps) {

    return (
        <View style={styles.container}>
            <NovelList novels={novels} onPressItem={() => { }} />
        </View>
    )
}