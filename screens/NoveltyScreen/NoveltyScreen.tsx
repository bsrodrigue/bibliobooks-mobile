import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, View } from "react-native";
import { NovelList } from "../../components";
import { RootStackParamList } from "../../types";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        marginTop: 10
    },
});

type LibraryScreenProps = NativeStackScreenProps<RootStackParamList, 'Library'>;

export default function LibraryScreen({ navigation }: LibraryScreenProps) {

    return (
        <View style={styles.container}>
            <NovelList novels={[]} onPressItem={() => { }} />
        </View>
    )
}