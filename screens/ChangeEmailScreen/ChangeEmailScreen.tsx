import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { signInWithEmailAndPassword, updateEmail } from "firebase/auth";
import { Formik } from "formik";
import { useState } from "react";
import { View } from "react-native";
import * as Yup from "yup";
import { AuthForm, Button, TextInput } from "../../components";
import { auth } from "../../config/firebase";
import { notify } from "../../lib";
import { useSession } from "../../providers";
import { RootStackParamList } from "../../types";

const changeEmailSchema = Yup.object().shape({
    email: Yup.string().email("Email invalide").required("Champ requis"),
    password: Yup.string().required("Champ requis"),
});

type ChangeEmailScreenProps = NativeStackScreenProps<RootStackParamList, 'ChangeEmail'>;

export default function ChangeEmailScreen({ navigation }: ChangeEmailScreenProps) {
    const { session: { userProfile }, updateSession } = useSession();
    const [isLoading, setIsLoading] = useState(false);

    return (
        <AuthForm
            title={"Configuration"}
            subtitle="Changement d'adresse email"
        >
            <Formik
                validationSchema={changeEmailSchema}
                initialValues={{
                    email: "",
                    password: "",
                }}
                onSubmit={
                    async (values) => {

                        try {
                            setIsLoading(true)
                            const recentLoggedUser = await signInWithEmailAndPassword(auth, userProfile.email, values.password);
                            await updateEmail(recentLoggedUser.user, values.email);
                            await updateSession({ userProfile: { ...userProfile, email: values.email } })
                            notify.success("Votre adresse email a été changée avec succès")
                            navigation.pop();
                        } catch (error) {
                            notify.error(error.message);
                        } finally {
                            setIsLoading(false)
                        }

                    }}
            >
                {({ values, errors, handleChange, handleSubmit }) => (
                    <View style={{ flex: 1, justifyContent: "space-between" }}>
                        <View>
                            <TextInput
                                value={values.email}
                                onChangeText={handleChange("email")}
                                errorMessage={errors.email}
                                label="Nouvelle adresse email"
                                placeholder="Veuillez saisir votre nouvelle adresse email" />
                            <TextInput
                                secureTextEntry
                                value={values.password}
                                onChangeText={handleChange("password")}
                                errorMessage={errors.password}
                                label="Mot de passe"
                                placeholder="Veuillez saisir votre mot de passe" />
                        </View>

                        <Button onPress={handleSubmit} loading={isLoading}>Confirmer</Button>
                    </View>
                )}
            </Formik>
        </AuthForm>
    )
}