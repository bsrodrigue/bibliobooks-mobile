import * as ImagePicker from "expo-image-picker";
import { useState } from "react";

export default function useImagePicker() {
    const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
    const [image, setImage] = useState(null);
    const [imgBase64, setImgBase64] = useState("");

    const handlePermission = async () => {
        const response = await requestPermission();
        return response.granted;
    }

    const pickImage = async () => {
        if (!status.granted) {
            const granted = await handlePermission();
            if (!granted) return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            base64: true,
            aspect: [4, 3],
            quality: 1,
        })

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            setImgBase64(result.assets[0].base64);
        }
    }

    return { image, imgBase64, pickImage };
}