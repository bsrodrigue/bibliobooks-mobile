import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Formik } from "formik";
import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { login } from "../../api";
import useCall from "../../api/useCall";
import { AuthForm, BaseAuthFormFooter, TextInput } from "../../components";
import { RootStackParamList } from "../../types";
import * as Yup from "yup";
import { useAsyncStorage } from "../../lib/storage";

const styles = StyleSheet.create({
    forgotPassword: {
        color: "#22A39F",
        textAlign: "right",
        textDecorationLine: "underline"
    }
});

const loginSchema = Yup.object().shape({
    email: Yup.string().email("Email invalide").required("Champ requis"),
    password: Yup.string().required("Champ requis"),
});

type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: LoginScreenProps) {
    const { storeData } = useAsyncStorage();

    const { call, isLoading } = useCall(login, {
        successMessage: "Connexion réussie", onSuccess(result) {
            storeData("session", result);
        },
    });

    return (
        <AuthForm
            title="Connexion"
            subtitle="Connectez-vous à votre compte">
            <View style={{ flex: 1, justifyContent: "space-between", paddingVertical: 15 }}>
                <Formik
                    initialValues={{
                        email: "",
                        password: "",
                    }}
                    validationSchema={loginSchema}
                    onSubmit={(values) => {
                        call(values);
                    }}>
                    {({ handleChange, handleSubmit, values, errors }) => (
                        <>
                            <View>
                                <TextInput errorMessage={errors.email} value={values.email} onChangeText={handleChange('email')} label="Adresse email" placeholder="Veuillez saisir votre adresse email" />
                                <TextInput errorMessage={errors.password} value={values.password} onChangeText={handleChange('password')} label="Mot de passe" placeholder="Veuillez saisir votre mot de passe" />
                                <TouchableWithoutFeedback onPress={() => navigation.navigate("ForgotPassword")}>
                                    <Text style={styles.forgotPassword}>
                                        Mot de passe oublié?
                                    </Text>
                                </TouchableWithoutFeedback>
                            </View>
                            <BaseAuthFormFooter
                                submitTitle="Se connecter"
                                alternativeTitle="Vous n'avez pas de compte?"
                                alternativeTitleNext="Inscrivez-vous!"
                                loading={isLoading}
                                onPressTitle={handleSubmit}
                                onPressAlternative={() => navigation.navigate("Register")}
                            />
                        </>
                    )}
                </Formik>

            </View>
        </AuthForm>
    )
}