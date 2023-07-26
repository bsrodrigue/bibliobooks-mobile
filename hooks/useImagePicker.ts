import * as ImagePicker from "expo-image-picker";
import { useState } from "react";

export default function useImagePicker() {
    const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
    const [imgUri, setImgUri] = useState(null);

    const handlePermission = async () => {
        const response = await requestPermission();
        return response.granted;
    }

    const pickImage = async (aspect: [number, number] = [1, 1]) => {
        if (!status.granted) {
            const granted = await handlePermission();
            if (!granted) return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect,
            quality: 0.5,
        })

        if (!result.canceled) {
            setImgUri(result.assets[0].uri);

        }
    }

    return { imgUri, pickImage };
}