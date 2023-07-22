import { Avatar } from "@rneui/base";
import { useTheme } from "@rneui/themed";
import { View } from "react-native";
import { TextInput } from "../../../components";
import { useImagePicker } from "../../../hooks";

export default function AccountStep() {
    const { theme: { colors: { primary, greyOutline, } } } = useTheme();
    const { image, pickImage } = useImagePicker();


    return (
        <>
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
        </>
    )
}