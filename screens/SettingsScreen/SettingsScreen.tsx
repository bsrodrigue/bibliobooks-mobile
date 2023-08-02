import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useTheme } from "@rneui/themed";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { useSession } from "../../providers";
import { RootStackParamList } from "../../types";

type SettingsScreenProps = NativeStackScreenProps<RootStackParamList, 'Settings'>;

export default function SettingsScreen({ navigation }: SettingsScreenProps) {
    const { theme: { colors: { error } } } = useTheme();
    const { stopSession } = useSession();

    const settings = [
        {
            title: "Apparence",
            children:
                [
                    {
                        title: "Basculer le Dark Mode",
                        // onPress: () => { stopSession() }
                    }
                ]
        },
        {
            title: "Autre",
            children:
                [
                    {
                        title: "Concernant le projet",
                        // onPress: () => { stopSession() }
                    }
                ]
        },
        {
            title: "Compte",
            children:
                [
                    {
                        title: "Changer d'adresse email",
                        onPress: () => { navigation.navigate("ChangeEmail") }
                    },
                    {
                        title: "Changer de mot de passe",
                        onPress: () => { navigation.navigate("ChangePassword") }
                    },
                    {
                        title: "Deconnexion",
                        danger: true,
                        onPress: () => { stopSession() }
                    },
                ]
        },
    ];

    return (
        <View style={{ flex: 1, backgroundColor: "white", paddingVertical: 10 }}>
            <FlatList data={settings}
                renderItem={({ index, item: { title, children } }) => (
                    <View key={index} style={{ paddingHorizontal: 40, marginVertical: 5 }}>
                        <Text style={{ fontFamily: "Quicksand-700" }}>{title}</Text>
                        <View style={{ marginVertical: 10 }}>
                            <FlatList
                                data={children} renderItem={({ index, item }) => (
                                    <TouchableOpacity
                                        onPress={item.onPress}
                                        style={{ marginVertical: 10 }} key={index}>
                                        <Text style={{ fontFamily: "Quicksand-600", color: item?.danger ? error : "black" }}>{item.title}</Text>
                                    </TouchableOpacity>
                                )} />
                        </View>
                    </View>
                )} />
        </View>
    )
}