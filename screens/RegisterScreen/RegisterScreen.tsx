import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { CheckBox } from "@rneui/base";
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

type RegisterScreenProps = NativeStackScreenProps<RootStackParamList, 'Register'>;

export default function RegisterScreen({ navigation }: RegisterScreenProps) {


    return (
        <AuthForm
            title="Inscription"
            subtitle="Créez un nouveau compte et rejoignez notre communauté"
            footer={<>
                <Button
                    title={"S'inscrire"}
                    titleStyle={styles.next}
                    color="black"
                    size="lg"
                    radius={5}
                    onPress={() => {
                        navigation.setOptions({})
                        navigation.navigate("Success", {
                            title: "Parfait",
                            subtitle: "Merci d’avoir choisi de rejoindre notre plateforme, mais avant de commencer, veuillez à présent configurer votre compte",
                            confirm: "Poursuivre",
                            destination: "Login"
                        })
                    }}
                />
                <Text style={styles.register}>Vous avez déjà un compte?
                    {" "}
                    <TouchableWithoutFeedback onPress={() => { navigation.navigate("Login"); }}>
                        <Text style={{ color: "#22A39F" }}>
                            Connectez-vous!
                        </Text>
                    </TouchableWithoutFeedback>
                </Text>
            </>}>
            <TextInput name="email" label="Adresse email" placeholder="Veuillez saisir votre adresse email" />
            <TextInput name="password" label="Mot de passe" placeholder="Veuillez saisir votre mot de passe" />
            <TextInput name="password2" label="Confirmation de mot de passe" placeholder="Veuillez confirmer votre mot de passe" />
            <CheckBox checked
                title="Je confirme mon inscription"
                checkedColor="black"
                uncheckedColor="black"
                containerStyle={{
                    width: "100%",
                    justifyContent: "flex-end",
                    flexDirection: "row"
                }}
                wrapperStyle={{
                }}
            />
        </AuthForm>
    )
}