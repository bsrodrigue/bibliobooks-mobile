import * as ImagePicker from "expo-image-picker";
import { Avatar } from "@rneui/base";
import { useState } from "react";
import { View } from "react-native";
import { useTheme } from "@rneui/themed";
import { TextInput } from "../../../components";
import { FormPartial } from "@n7studio/react-original-form-native";

export default function AccountStep() {
    const [image, setImage] = useState(null);
    const { theme: { colors: { greyOutline, primary } } } = useTheme();

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    }

    return (
        <FormPartial>
            <View style={{ alignItems: "center", position: "relative" }}>
                <Avatar
                    size={50}
                    rounded
                    onPress={pickImage}
                    icon={{ name: "pencil", type: "font-awesome" }}
                    containerStyle={{ backgroundColor: greyOutline, position: "absolute", zIndex: 1, right: "20%" }}
                />
                <Avatar
                    size={180}
                    rounded
                    containerStyle={{ backgroundColor: primary, marginBottom: 10, padding: 5 }}
                    source={{ uri: image }}
                />
            </View>
            <TextInput name="pseudo" label="Pseudonyme" placeholder="Veuillez saisir votre pseudonyme" />
            <TextInput name="bio" label="Bio" placeholder="Veuillez parler un peu de vous-même..." multiline numberOfLines={8} />
        </FormPartial>
    )
}