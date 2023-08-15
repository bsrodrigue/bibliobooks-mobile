import { Image, StyleSheet, Text, View } from "react-native";
import { Button } from "../Button";

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
    },

    subtitle: {
        fontSize: 18,
        fontFamily: "Quicksand-600",
        opacity: 0.6,
        textAlign: "center"
    },

    confirm: {
        color: "black",
        fontSize: 20,
        fontFamily: "Quicksand-700",
    }
});

const dimension = 140;

type SuccessScreenComponentProps = {
    onPress?: () => void;
}

export default function SuccessScreenComponent({ onPress }: SuccessScreenComponentProps) {
    return (
        <View style={styles.container}>
            <Image style={{
                width: dimension,
                height: dimension
            }} source={require("../../assets/illustrations/literature.png")} />
            <View>
                <Text style={styles.title}>Félicitations 🔥</Text>
                <Text style={styles.subtitle}>
                    {"Votre compte est finalement prêt! Vous pouvez maintenant accéder à la plateforme ;')"}
                </Text>
            </View>
            <Button
                onPress={onPress}
                buttonStyle={{ backgroundColor: "white" }}
                titleStyle={styles.confirm}>Poursuivre</Button>
        </View>
    )
}