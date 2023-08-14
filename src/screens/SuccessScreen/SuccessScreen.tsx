import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RootStackParamList } from "../../types";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        justifyContent: "space-around",
        alignItems: "center",
        paddingHorizontal: 40,
        paddingVertical: 15,
        paddingTop: 100,
    },

    title: {
        fontSize: 40,
        fontFamily: "Quicksand-700",
        textAlign: "center",
        marginBottom: 10,
    },

    subtitle: {
        fontSize: 20,
        fontFamily: "Quicksand-600",
        opacity: 0.5,
        textAlign: "center"
    },

    confirm: {
        fontSize: 20,
        fontFamily: "Quicksand-700",
    }
});


type SuccessScreenProps = NativeStackScreenProps<RootStackParamList, 'Success'>;

export default function SuccessScreen({ navigation, route }: SuccessScreenProps) {
    const dimension = 165
    const { title, subtitle, confirm, destination } = route.params;

    return (
        <View style={styles.container}>
            <Image style={{
                width: dimension,
                height: dimension
            }} source={require("../../assets/illustrations/party.png")} />
            <View>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.subtitle}>{subtitle}</Text>
            </View>
            <TouchableOpacity onPress={async () => {
                navigation.navigate(destination)
            }}>
                <Text style={styles.confirm}>{confirm}</Text>
            </TouchableOpacity>
        </View>
    )
}