import { Avatar } from "@rneui/base";
import { useTheme } from "@rneui/themed";
import { Formik } from "formik";
import { View } from "react-native";
import * as Yup from "yup";
import { SetupAccountInput } from "../../../api/auth";
import { Button, TextInput } from "../../../components";
import { useImagePicker } from "../../../hooks";

const accountSchema = Yup.object().shape({
    pseudo: Yup.string().required("Champ requis"),
    bio: Yup.string().required("Champ requis"),
});

type AccountStepProps = {
    formValues?: object;
    onNext?: (values: Partial<SetupAccountInput>) => void;
};

export default function AccountStep({ formValues, onNext }: AccountStepProps) {
    const { theme: { colors: { primary, greyOutline, } } } = useTheme();
    const { imgUri, pickImage } = useImagePicker();

    return (
        <Formik
            validationSchema={accountSchema}
            initialValues={{
                pseudo: "",
                bio: "",
            }}
            onSubmit={async (values) => {
                const response = await fetch(imgUri);
                const blob = await response.blob();
                onNext?.({ ...formValues, ...values, avatarImg: blob })
            }}
        >
            {({ handleChange, handleSubmit, values, errors }) => (
                <View style={{ flex: 1, justifyContent: "space-between", paddingTop: 15 }}>
                    <View>
                        <View style={{ alignItems: "center", position: "relative" }}>
                            <Avatar
                                size={50}
                                rounded
                                onPress={() => pickImage()}
                                icon={{ name: "pencil", type: "font-awesome" }}
                                containerStyle={{ backgroundColor: greyOutline, position: "absolute", zIndex: 1, right: "20%" }}
                            />
                            <Avatar
                                size={180}
                                rounded
                                containerStyle={{ backgroundColor: primary, marginBottom: 10, padding: 5 }}
                                source={{ uri: imgUri }}
                            />
                        </View>
                        <TextInput
                            errorMessage={errors.pseudo} value={values.pseudo}
                            name="pseudo" label="Pseudonyme"
                            onChangeText={handleChange("pseudo")}
                            placeholder="Veuillez saisir votre pseudonyme" />
                        <TextInput
                            errorMessage={errors.bio} value={values.bio}
                            name="bio" label="Bio"
                            onChangeText={handleChange("bio")}
                            placeholder="Veuillez parler un peu de vous-même..." multiline numberOfLines={8} />
                    </View>
                    <Button onPress={() => handleSubmit()} title="Suivant" />
                </View>
            )}
        </Formik>
    )
}