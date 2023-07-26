import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Avatar, useTheme } from "@rneui/themed";
import { View, Text } from "react-native";
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
                <View style={{ alignItems: "center" }}>
                    <Avatar
                        size={120}
                        rounded
                        containerStyle={{ backgroundColor: primary, marginBottom: 10, padding: 5 }}
                        source={{ uri: avatarUrl }}
                    />
                </View>
                <View>
                    <Text>{firstName}</Text>
                    <Text>{lastName}</Text>
                    <Text>{bio}</Text>
                    <Text>{pseudo}</Text>
                </View>
            </View>
            <View>
            </View>
        </View>
    )
}