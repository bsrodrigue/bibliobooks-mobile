import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, View } from "react-native";
import { RootStackParamList } from "../../types";



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



    return (
        <View style={styles.container}>
        </View>
    )
}