import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, Text, TouchableOpacity } from "react-native";
import { RootStackParamList } from "../../types";
import { Button, CardBottomSheet, TextInput } from "../../components";
import { Avatar, CheckBox } from "@rneui/base";
import { useTheme } from "@rneui/themed";
import { useImagePicker } from "../../hooks";
import { useState } from "react";

type NovelFormScreenProps = NativeStackScreenProps<RootStackParamList, 'NovelForm'>;

export default function NovelFormScreen({ navigation, route: { params: { mode, novel } } }: NovelFormScreenProps) {
    const { theme: { colors: { error } } } = useTheme();
    const [genreSheetIsVisible, setGenreSheetIsVisible] = useState(false);
    const { image, pickImage } = useImagePicker();

    return (
        <View style={{ flex: 1, backgroundColor: "white", justifyContent: "space-between", }}>
            <View style={{ flex: 0.9 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 40, gap: 10, paddingVertical: 20 }}>
                    <View style={{ flex: 0.3 }}>
                        <TouchableOpacity onPress={pickImage}>
                            <Avatar
                                containerStyle={{ backgroundColor: "grey", height: 125, width: "100%", borderRadius: 10 }}
                                avatarStyle={{ borderRadius: 10 }}
                                source={{ uri: image }}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={{ flex: 0.7 }}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                            <CheckBox checked checkedColor={error} uncheckedColor={error} containerStyle={{ margin: 0, padding: 0 }} />
                            <View style={{ flex: 1 }}>
                                <Text style={{ color: error, fontFamily: "Quicksand-700", textAlign: "right" }}>Histoire mature</Text>
                                <Text style={{ color: error, fontFamily: "Quicksand-600", fontSize: 12, textAlign: "right" }
                                }>Cette histoire de ne sera pas visible pour les lecteurs qui n’ont pas au moins 18 ans. </Text>
                            </View>
                        </View>
                        <TextInput label="Titre" placeholder="Veuillez saisir le titre du roman" />
                    </View>
                </View>

                <View style={{ paddingHorizontal: 40 }}>
                    <TextInput name="description" label="Resumé de l'histoire" placeholder="Veuillez donner le resumé de l'histoire..." multiline numberOfLines={8} />
                    <TouchableOpacity onPress={() => setGenreSheetIsVisible(true)}>
                        <TextInput name="genre" label="Genre de l'histoire" placeholder="Veuillez choisir le genre de l'histoire" disabled />
                    </TouchableOpacity>
                </View>


            </View>

            <View style={{ flex: 0.1, paddingHorizontal: 40 }}>
                <Button buttonStyle={{ backgroundColor: "black", borderRadius: 10 }}>Sauvegarder</Button>
            </View>
            <CardBottomSheet isVisible={genreSheetIsVisible} onBackdropPress={() => setGenreSheetIsVisible(false)}>
                <View>
                    <CheckBox checked={false} title="Historique" />
                </View>
            </CardBottomSheet>
        </View>
    )
}