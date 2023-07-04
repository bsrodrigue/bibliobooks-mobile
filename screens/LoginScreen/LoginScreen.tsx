import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, Text, TouchableWithoutFeedback } from "react-native";
import { AuthForm, Button, TextInput } from "../../components";
import { RootStackParamList } from "../../types";

const styles = StyleSheet.create({
    next: {
        fontSize: 20,
        fontFamily: "Quicksand-700"
    },

    register: {
        textAlign: "center",
        textDecorationLine: "underline",
    }
});


type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: LoginScreenProps) {

    return (
        <AuthForm title="Connexion" subtitle="Connectez-vous à votre compte" footer={<>
            <Button
                title={"Se connecter"}
                titleStyle={styles.next}
                color="black"
                size="lg"
                radius={5}
            />
            <Text style={styles.register}>Vous n'avez pas de compte?
                {" "}
                <TouchableWithoutFeedback
                    onPress={() => {
                        navigation.navigate("Register");
                    }}
                >
                    <Text style={{
                        color: "#22A39F",
                    }}
                    >
                        Inscrivez-vous!
                    </Text>
                </TouchableWithoutFeedback>
            </Text>
        </>}>
            <TextInput label="Adresse email" placeholder="Veuillez saisir votre adresse email" />
            <TextInput label="Mot de passe" placeholder="Veuillez saisir votre mot de passe" />

            <TouchableWithoutFeedback
                onPress={() => {
                    navigation.navigate("ForgotPassword")
                }}
            >
                <Text style={{
                    color: "#22A39F",
                    textAlign: "right",
                    textDecorationLine: "underline"
                }}>
                    Mot de passe oublié?
                </Text>
            </TouchableWithoutFeedback>
        </AuthForm>
    )
}