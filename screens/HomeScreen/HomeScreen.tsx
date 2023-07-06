import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, View } from "react-native";
import { RootStackParamList } from "../../types";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
});


type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation, route }: HomeScreenProps) {

    return (
        <View style={styles.container}>

        </View>
    )
}