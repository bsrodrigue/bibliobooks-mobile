import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useRef } from "react";
import { StyleSheet, Text, TouchableWithoutFeedback } from "react-native";
import { AuthForm, BaseAuthFormFooter, TextInput } from "../../components";
import { RootStackParamList } from "../../types";

const styles = StyleSheet.create({
    forgotPassword: {
        color: "#22A39F",
        textAlign: "right",
        textDecorationLine: "underline"
    }
});

type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: LoginScreenProps) {

    return (
        <AuthForm title="Connexion" subtitle="Connectez-vous à votre compte"
            footer={<BaseAuthFormFooter
                submitTitle="Se connecter"
                alternativeTitle="Vous n'avez pas de compte?"
                alternativeTitleNext="Inscrivez-vous!" onPressTitle={() => {
                    navigation.navigate("SetupAccount");
                }} />}>
            <TextInput name="email" label="Adresse email" placeholder="Veuillez saisir votre adresse email" />
            <TextInput name="password" label="Mot de passe" placeholder="Veuillez saisir votre mot de passe" />
            <TouchableWithoutFeedback onPress={() => navigation.navigate("ForgotPassword")}>
                <Text style={styles.forgotPassword}>
                    Mot de passe oublié?
                </Text>
            </TouchableWithoutFeedback>
        </AuthForm>
    )
}