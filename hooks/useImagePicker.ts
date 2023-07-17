import * as ImagePicker from "expo-image-picker";
import { useState } from "react";

export default function useImagePicker() {
    const [image, setImage] = useState(null);

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

    return { image, pickImage };
}