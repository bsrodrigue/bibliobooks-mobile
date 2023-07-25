import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Avatar, useTheme } from "@rneui/themed";
import { View } from "react-native";
import { useImagePicker } from "../../hooks";
import { RootStackParamList } from "../../types";
import { useState } from "react";
import { useSession } from "../../providers";

type AccountScreenProps = NativeStackScreenProps<RootStackParamList, 'Account'>;

export default function AccountScreen({ navigation }: AccountScreenProps) {
    const { theme: { colors: { primary, greyOutline } } } = useTheme();
    const [isEditMode, setIsEditMode] = useState(false);
    const { session: { userProfile: { pseudo, firstName, lastName, bio, avatarUrl, email } } } = useSession();
    const { image, pickImage } = useImagePicker();

    return (
        <View style={{ flex: 1, backgroundColor: "white", paddingHorizontal: 40, justifyContent: "space-between", paddingVertical: 10 }}>
            <View>
                <View style={{ alignItems: "center", position: "relative" }}>
                    <Avatar
                        size={30}
                        rounded
                        onPress={pickImage}
                        icon={{ name: "pencil", type: "font-awesome" }}
                        containerStyle={{ backgroundColor: greyOutline, position: "absolute", zIndex: 1, right: "30%" }}
                    />
                    <Avatar
                        size={120}
                        rounded
                        containerStyle={{ backgroundColor: primary, marginBottom: 10, padding: 5 }}
                        source={{ uri: image }}
                    />
                </View>
            </View>
            <View>
            </View>
        </View>
    )
}