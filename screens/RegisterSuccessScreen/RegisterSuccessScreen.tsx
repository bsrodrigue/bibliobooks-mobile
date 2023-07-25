import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Image, StyleSheet, Text, View } from "react-native";
import useCall from "../../api/useCall";
import { Button } from "../../components";
import { useSession } from "../../providers";
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
        color: "black",
        fontSize: 20,
        fontFamily: "Quicksand-700",
    }
});

type SuccessScreenProps = NativeStackScreenProps<RootStackParamList, 'RegisterSuccess'>;

export default function SuccessScreen({ route }: SuccessScreenProps) {
    const dimension = 165
    const { updateSession } = useSession();
    const { call, isLoading } = useCall(updateSession);
    const { userProfile } = route.params;

    return (
        <View style={styles.container}>
            <Image style={{
                width: dimension,
                height: dimension
            }} source={require("../../assets/illustrations/party.png")} />
            <View>
                <Text style={styles.title}>Félicitations</Text>
                <Text style={styles.subtitle}>Votre inscription s'est bien déroulée! Veuillez à présent configurer votre compte pour profiter de la plateforme</Text>
            </View>
            <Button
                onPress={() => call({ userProfile })}
                loading={isLoading}
                buttonStyle={{ backgroundColor: "white" }}
                titleStyle={styles.confirm}>D'accord</Button>
        </View>
    )
}