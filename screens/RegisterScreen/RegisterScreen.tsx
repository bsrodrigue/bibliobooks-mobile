import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Icon } from "@rneui/base";
import { Formik } from "formik";
import { View } from "react-native";
import * as Yup from "yup";
import { register } from "../../api/auth";
import useCall from "../../api/useCall";
import { AuthForm, BaseAuthFormFooter, TextInput } from "../../components";
import { RootStackParamList } from "../../types";

const registerSchema = Yup.object().shape({
    email: Yup.string().email("Email invalide").required("Champ requis"),
    password: Yup.string().required("Champ requis"),
    password2: Yup.string().required("Champ requis")
        .oneOf([Yup.ref('password')], 'Les mots de passe ne correspondent pas'),
});

type RegisterScreenProps = NativeStackScreenProps<RootStackParamList, 'Register'>;

export default function RegisterScreen({ navigation }: RegisterScreenProps) {
    const { call, isLoading } = useCall(register, {
        onSuccess(userProfile) {
            navigation.replace("RegisterSuccess", { userProfile });
        },
    });

    return (
        <AuthForm
            title="Inscription"
            subtitle="Rejoignez notre communauté de lecteurs">
            <View style={{ flex: 1, justifyContent: "space-between", paddingVertical: 15, paddingTop: 30 }}>
                <Formik
                    initialValues={{
                        email: "",
                        password: "",
                        password2: "",
                    }}
                    validationSchema={registerSchema}
                    onSubmit={(values) => {
                        call(values);
                    }}>
                    {({ handleChange, handleSubmit, values, errors }) => (
                        <>
                            <View>
                                <TextInput leftIcon={<Icon name="email" type="fontisto" />} errorMessage={errors.email} value={values.email} onChangeText={handleChange('email')} label="Adresse email" placeholder="Veuillez saisir votre adresse email" />
                                <TextInput leftIcon={<Icon name="lock" type="foundation" />}
                                    secureTextEntry errorMessage={errors.password} value={values.password}
                                    onChangeText={handleChange('password')} label="Mot de passe"
                                    placeholder="Veuillez saisir votre mot de passe"
                                />
                                <TextInput leftIcon={<Icon name="lock" type="foundation" />}
                                    secureTextEntry errorMessage={errors.password2} value={values.password2}
                                    onChangeText={handleChange('password2')} label="Confirmation du mot de passe"
                                    placeholder="Veuillez confirmer votre mot de passe" />
                            </View>
                            <BaseAuthFormFooter
                                submitTitle="S'inscrire"
                                alternativeTitle="Vous avez déjà un compte?"
                                alternativeTitleNext="Connectez-vous!"
                                loading={isLoading}
                                onPressTitle={handleSubmit}
                                onPressAlternative={() => navigation.navigate("Login")}
                            />
                        </>
                    )}
                </Formik>

            </View>
        </AuthForm>
    )
}