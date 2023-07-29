import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Formik } from "formik";
import { useState } from "react";
import { View } from "react-native";
import * as Yup from "yup";
import { AuthForm, Button, TextInput } from "../../components";
import { auth } from "../../config/firebase";
import { notify } from "../../lib";
import { useSession } from "../../providers";
import { RootStackParamList } from "../../types";
import { signInWithEmailAndPassword, updatePassword } from "firebase/auth";

const changePasswordSchema = Yup.object().shape({
    oldPassword: Yup.string().required("Champ requis"),
    password: Yup.string().required("Champ requis"),
    password2: Yup.string().required("Champ requis")
        .oneOf([Yup.ref('password')], 'Les mots de passe ne correspondent pas'),
});

type ChangePasswordScreenProps = NativeStackScreenProps<RootStackParamList, 'ChangePassword'>;

export default function ChangePasswordScreen({ navigation }: ChangePasswordScreenProps) {
    const { session: { userProfile }, updateSession } = useSession();
    const [isLoading, setIsLoading] = useState(false);

    return (
        <AuthForm
            title={"Changement"}
            subtitle="Changer votre mot de passe"
        >
            <Formik
                validationSchema={changePasswordSchema}
                initialValues={{
                    oldPassword: "",
                    password: "",
                    password2: "",
                }}
                onSubmit={
                    async (values) => {

                        try {
                            setIsLoading(true)
                            const creds = await signInWithEmailAndPassword(auth, userProfile.email, values.oldPassword);
                            await updatePassword(creds.user, values.password);
                            notify.success("Votre mot de passe a été changée avec succès")
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
                            <TextInput value={values.oldPassword}
                                onChangeText={handleChange("oldPassword")}
                                errorMessage={errors.oldPassword}
                                label="Ancien mot de passe"
                                secureTextEntry
                                placeholder="Veuillez saisir votre ancien mot de passe" />
                            <TextInput value={values.password}
                                onChangeText={handleChange("password")}
                                errorMessage={errors.password}
                                label="Nouveau mot de passe"
                                secureTextEntry
                                placeholder="Veuillez saisir votre nouveau mot de passe" />
                            <TextInput value={values.password2}
                                onChangeText={handleChange("password2")}
                                errorMessage={errors.password2}
                                label="Confirmation du mot de passe"
                                secureTextEntry
                                placeholder="Veuillez saisir à nouveau votre nouveau mot de passe" />
                        </View>

                        <Button onPress={handleSubmit} loading={isLoading}>Confirmer</Button>
                    </View>
                )}
            </Formik>
        </AuthForm>
    )
}