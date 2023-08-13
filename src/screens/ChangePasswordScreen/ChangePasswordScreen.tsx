import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Formik } from "formik";
import { View } from "react-native";
import * as Yup from "yup";
import { changePassword } from "../../api/auth";
import useCall from "../../api/useCall";
import { AuthForm, Button, TextInput } from "../../components";
import { RootStackParamList } from "../../types";

const changePasswordSchema = Yup.object().shape({
    oldPassword: Yup.string().required("Champ requis"),
    password: Yup.string().required("Champ requis"),
    password2: Yup.string().required("Champ requis")
        .oneOf([Yup.ref('password')], 'Les mots de passe ne correspondent pas'),
});

type ChangePasswordScreenProps = NativeStackScreenProps<RootStackParamList, 'ChangePassword'>;

export default function ChangePasswordScreen({ navigation }: ChangePasswordScreenProps) {
    const { call, isLoading } = useCall(changePassword, {
        successMessage: "Votre mot de passe a été changé avec succès",
        onSuccess() {
            navigation.pop();
        },
    })

    return (
        <AuthForm
            title={"Changement"}
            subtitle="Changer votre mot de passe">
            <Formik
                validationSchema={changePasswordSchema}
                initialValues={{
                    oldPassword: "",
                    password: "",
                    password2: "",
                }}
                onSubmit={
                    async ({ oldPassword, password }) => {
                        await call({ oldPassword, password });
                    }}>
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