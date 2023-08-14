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


type ForgotPasswordScreenProps = NativeStackScreenProps<RootStackParamList, 'ForgotPassword'>;

export default function ForgotPasswordScreen({ navigation }: ForgotPasswordScreenProps) {

    return (
        <AuthForm
            title={"Réinitialisation"}
            subtitle="Réinitialiser votre mot de passe"
            footer={<>
                <Button
                    title={"Recevoir un code"}
                    titleStyle={styles.next}
                    color="black"
                    size="lg"
                    radius={5}
                />
            </>}>
            <TextInput name="email" label="Adresse email" placeholder="Veuillez saisir votre adresse email" />

            <TouchableWithoutFeedback
                onPress={() => {
                    navigation.navigate("Login")
                }}
            >
                <Text style={{
                    color: "#22A39F",
                    textAlign: "right",
                    textDecorationLine: "underline"
                }}>
                    Vous vous souvenez de votre mot de passe?
                </Text>
            </TouchableWithoutFeedback>
        </AuthForm>
    )
}