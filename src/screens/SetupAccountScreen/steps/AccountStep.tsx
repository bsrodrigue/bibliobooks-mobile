import { Avatar } from "@rneui/base";
import { useTheme } from "@rneui/themed";
import { Formik } from "formik";
import { View } from "react-native";
import * as Yup from "yup";
import { SetupAccountInput } from "../../../api/auth";
import { Button, TextInput } from "../../../components";
import { useImagePicker } from "../../../hooks";

const accountSchema = Yup.object().shape({
    username: Yup.string().required("Champ requis")
        .test('no-spaces', "Ce champ ne peut contenir des espaces", value => {
            return !/\s/.test(value);
        })
    ,
    bio: Yup.string().optional(),
});

type AccountStepProps = {
    onNext?: (values: Partial<SetupAccountInput>) => void;
    formValues: Partial<SetupAccountInput>;
};

export default function AccountStep({ onNext, formValues }: AccountStepProps) {
    const { theme: { colors: { black, greyOutline, } } } = useTheme();
    const { imgUri, pickImage } = useImagePicker();

    return (
        <Formik
            validationSchema={accountSchema}
            initialValues={{
                username: formValues?.username || "",
                bio: formValues?.bio || "",
            }}
            onSubmit={async (values) => {
                let blob = null;
                if (imgUri) {
                    const response = await fetch(imgUri);
                    blob = await response.blob();
                }
                onNext?.({ ...values, avatarImg: blob })
            }}
        >
            {({ handleChange, handleSubmit, values, errors }) => (
                <View style={{ flex: 1, justifyContent: "space-between" }}>
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
                                size={125}
                                rounded
                                containerStyle={{ backgroundColor: black, marginBottom: 10, padding: 2 }}
                                source={{ uri: imgUri }}
                            />
                        </View>
                        <TextInput
                            errorMessage={errors.username} value={values.username}
                            name="username" label="Nom d'utilisateur"
                            onChangeText={handleChange("username")}
                            placeholder="Veuillez saisir votre nom d'utilisateur" />
                        <TextInput
                            errorMessage={errors.bio} value={values.bio}
                            name="bio" label="Biographie"
                            onChangeText={handleChange("bio")}
                            placeholder="Veuillez parler un peu de vous-même..." multiline numberOfLines={8} />
                    </View>
                    <Button onPress={() => handleSubmit()} title="Suivant" />
                </View>
            )}
        </Formik>
    )
}