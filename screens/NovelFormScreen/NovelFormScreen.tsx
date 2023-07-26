import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Avatar } from "@rneui/base";
import { useTheme } from "@rneui/themed";
import { Formik } from "formik";
import { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import * as Yup from "yup";
import { CreateNovelInput, createNovel } from "../../api/novels";
import useCall from "../../api/useCall";
import { Button, CardBottomSheet, CheckBox, TextInput, Wrapper } from "../../components";
import { config } from "../../config";
import { useImagePicker } from "../../hooks";
import { useSession } from "../../providers";
import { RootStackParamList } from "../../types";

const novelSchema = Yup.object().shape({
    title: Yup.string().required("Champ requis"),
    description: Yup.string().required("Champ requis"),
    genre: Yup.string().required("Champ requis"),
    isMature: Yup.string(),
});

type NovelFormScreenProps = NativeStackScreenProps<RootStackParamList, 'NovelForm'>;

export default function NovelFormScreen({ navigation, route: { params: { mode, novel } } }: NovelFormScreenProps) {
    const { theme: { colors: { error } } } = useTheme();
    const [genreSheetIsVisible, setGenreSheetIsVisible] = useState(false);
    const { call, isLoading } = useCall(createNovel, {
        onSuccess(result) {
            navigation.replace("ChapterWorkshop", { novel: result });
        },
        successMessage: "Nouvelle histoire créée avec succès!"
    });
    const { session: { userProfile: { userId } } } = useSession();
    const [selectedGenre, setSelectedGenre] = useState(novel?.genre);
    const [isMature, setIsMature] = useState(novel?.isMature);
    const { imgUri, pickImage } = useImagePicker();

    return (
        <Formik
            validationSchema={novelSchema}
            initialValues={{
                title: novel?.title,
                description: novel?.description,
                genre: novel?.genre,
                isMature,
            }} onSubmit={async (values: CreateNovelInput) => {
                const response = await fetch(imgUri);
                const blob = await response.blob();
                const result = await call({ coverImg: blob, ...values, userId })
            }}>
            {
                ({ handleSubmit, handleChange, values, errors }) => (
                    <View style={{ flex: 1, backgroundColor: "white", justifyContent: "space-between", }}>
                        <View style={{ flex: 0.9 }}>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 40, gap: 10, paddingVertical: 20 }}>
                                <View style={{ flex: 0.3 }}>
                                    <TouchableOpacity onPress={() => pickImage([9, 16])}>
                                        <Avatar
                                            containerStyle={{ backgroundColor: "grey", height: 125, width: "100%", borderRadius: 10 }}
                                            avatarStyle={{ borderRadius: 10, resizeMode: "cover" }}
                                            source={{ uri: imgUri }}
                                        />
                                    </TouchableOpacity>
                                </View>

                                <View style={{ flex: 0.7 }}>
                                    <TextInput errorMessage={errors.title} value={values.title} onChangeText={handleChange("title")} label="Titre" placeholder="Veuillez saisir le titre du roman" />
                                </View>
                            </View>

                            <Wrapper>
                                <TextInput errorMessage={errors.description} value={values.description} onChangeText={handleChange("description")} name="description" label="Resumé de l'histoire" placeholder="Veuillez donner le resumé de l'histoire..." multiline numberOfLines={8} />
                                <TouchableOpacity onPress={() => setGenreSheetIsVisible(true)}>
                                    <TextInput errorMessage={errors.genre} value={config.genreTitleMap[selectedGenre]} name="genre" label="Genre de l'histoire" placeholder="Veuillez choisir le genre de l'histoire" disabled />
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
                                        onPress={() => {
                                            setIsMature(!isMature);
                                            handleChange("isMature")(JSON.stringify(!isMature));
                                        }}
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
                            <Button loading={isLoading} onPress={() => handleSubmit()} buttonStyle={{ backgroundColor: "black", borderRadius: 10 }}>Sauvegarder</Button>
                        </View>

                        <CardBottomSheet isVisible={genreSheetIsVisible} onBackdropPress={() => setGenreSheetIsVisible(false)}>
                            <View style={{ flex: 1 }}>
                                <FlatList data={config.genres} renderItem={({ index, item: { title, value } }) => (
                                    <View key={index}>
                                        <CheckBox checked={selectedGenre === value} title={title} onPress={() => {
                                            handleChange("genre")(value);
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
        </Formik>
    )
}