import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Icon } from "@rneui/base";
import { Avatar, useTheme } from "@rneui/themed";
import { useState } from "react";
import { Text, View } from "react-native";
import { useSession } from "../../providers";
import { RootStackParamList } from "../../types";

type AccountScreenProps = NativeStackScreenProps<RootStackParamList, 'Account'>;

export default function AccountScreen({ navigation }: AccountScreenProps) {
    const { theme: { colors: { primary, greyOutline } } } = useTheme();
    const [isEditMode, setIsEditMode] = useState(false);
    const { session: { userProfile: { pseudo, firstName, lastName, bio, avatarUrl, email, birthdate, gender } } } = useSession();

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
                    <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 15, gap: 15 }}>
                        <Text style={{ fontFamily: "Quicksand-700", fontSize: 25 }}>{firstName}</Text>
                        <View>
                            <Text style={{ fontFamily: "Quicksand-700", fontSize: 25 }}>{lastName}</Text>
                        </View>
                    </View>
                    <View style={{ marginVertical: 5 }}>
                        <View style={{ alignItems: "center" }}>
                            <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                                <Icon type="font-awesome-5" name={gender === "male" ? "male" : "female"} />
                                <Text style={{ opacity: 0.5, fontStyle: "italic" }}>{gender === "male" ? "Homme" : "Femme"}</Text>
                            </View>
                            <Text style={{ fontFamily: "Quicksand-600", fontSize: 20 }}>{pseudo}</Text>
                        </View>

                        <View style={{ marginVertical: 15 }}>
                            <Text style={{ textAlign: "left", fontFamily: "Quicksand-500" }}>{bio}</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View>
            </View>
        </View>
    )
}