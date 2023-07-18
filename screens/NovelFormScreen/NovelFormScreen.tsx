import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { RootStackParamList } from "../../types";
import { Button, CardBottomSheet, CheckBox, TextInput, Wrapper } from "../../components";
import { Avatar } from "@rneui/base";
import { useTheme } from "@rneui/themed";
import { useImagePicker } from "../../hooks";
import { useState } from "react";
import { config } from "../../config";

type NovelFormScreenProps = NativeStackScreenProps<RootStackParamList, 'NovelForm'>;

export default function NovelFormScreen({ navigation, route: { params: { mode, novel } } }: NovelFormScreenProps) {
    const { theme: { colors: { error } } } = useTheme();
    const [genreSheetIsVisible, setGenreSheetIsVisible] = useState(false);
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [isMature, setIsMature] = useState(false);
    const { image, pickImage } = useImagePicker();

    return (
        <View style={{ flex: 1, backgroundColor: "white", justifyContent: "space-between", }}>
            <View style={{ flex: 0.9 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 40, gap: 10, paddingVertical: 20 }}>
                    <View style={{ flex: 0.3 }}>
                        <TouchableOpacity onPress={pickImage}>
                            <Avatar
                                containerStyle={{ backgroundColor: "grey", height: 125, width: "100%", borderRadius: 10 }}
                                avatarStyle={{ borderRadius: 10, resizeMode: "cover" }}
                                source={{ uri: image }}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={{ flex: 0.7 }}>

                        <TextInput label="Titre" placeholder="Veuillez saisir le titre du roman" />
                    </View>
                </View>


                <Wrapper>
                    <TextInput name="description" label="Resumé de l'histoire" placeholder="Veuillez donner le resumé de l'histoire..." multiline numberOfLines={8} />
                    <TouchableOpacity onPress={() => setGenreSheetIsVisible(true)}>
                        <TextInput value={config.genreTitleMap[selectedGenre]} name="genre" label="Genre de l'histoire" placeholder="Veuillez choisir le genre de l'histoire" disabled />
                    </TouchableOpacity>
                </Wrapper>

                <Wrapper>
                    <View style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginVertical: 10,
                        paddingVertical: 20,
                        paddingHorizontal: 20,
                        borderRadius: 15,
                        backgroundColor: 'rgba(233,46,56,0.1)'

                    }}>
                        <CheckBox
                            onPress={() => setIsMature(!isMature)}
                            checked={isMature}
                            checkedColor={error}
                            uncheckedColor={error}
                            containerStyle={{ margin: 0, padding: 0, backgroundColor: "transparent" }} />
                        <View style={{ flex: 1 }}>
                            <Text style={{ color: error, fontFamily: "Quicksand-700", textAlign: "right" }}>Histoire mature</Text>
                            <Text style={{ color: error, fontFamily: "Quicksand-500", fontSize: 12, textAlign: "right" }
                            }>Cette histoire de ne sera pas visible pour les lecteurs qui n’ont pas au moins 18 ans. </Text>
                        </View>
                    </View>
                </Wrapper>

            </View>

            <View style={{ flex: 0.1, paddingHorizontal: 40 }}>
                <Button buttonStyle={{ backgroundColor: "black", borderRadius: 10 }}>Sauvegarder</Button>
            </View>

            <CardBottomSheet isVisible={genreSheetIsVisible} onBackdropPress={() => setGenreSheetIsVisible(false)}>
                <View style={{ flex: 1 }}>
                    <FlatList data={config.genres} renderItem={({ index, item: { title, value } }) => (
                        <View key={index}>
                            <CheckBox checked={selectedGenre === value} title={title} onPress={() => {
                                setSelectedGenre(value);
                                setGenreSheetIsVisible(false);
                            }} />
                        </View>
                    )} />
                </View>
            </CardBottomSheet>
        </View>
    )
}