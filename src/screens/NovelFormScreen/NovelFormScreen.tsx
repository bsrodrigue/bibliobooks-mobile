import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Avatar } from "@rneui/base";
import { useTheme } from "@rneui/themed";
import { Formik } from "formik";
import { useRef, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as Yup from "yup";
import { CreateNovelInput, createNovel, editNovel } from "../../api/novels";
import useCall from "../../api/useCall";
import { Button, CardBottomSheet, CheckBox, TextInput, Wrapper } from "../../components";
import { config } from "../../config";
import { useImagePicker } from "../../hooks";
import { useWorkshop } from "../../providers/WorkshopProvider";
import { RootStackParamList } from "../../types";
import { Novel, NovelGenre } from "../../types/models";

const novelSchema = Yup.object().shape({
    title: Yup.string().required("Champ requis"),
    description: Yup.string().required("Champ requis"),
    genre: Yup.string().required("Champ requis"),
    isMature: Yup.string().optional()
});

type NovelFormScreenProps = NativeStackScreenProps<RootStackParamList, 'NovelForm'>;

export default function NovelFormScreen({ navigation, route: { params: { mode, novel } } }: NovelFormScreenProps) {
    const { theme: { colors: { error } } } = useTheme();
    const { addWorkshopNovel, updateWorkshopNovel } = useWorkshop();
    const [genreSheetIsVisible, setGenreSheetIsVisible] = useState(false);
    const { call, isLoading } = useCall(createNovel, {
        onSuccess(result) {
            const payload = result as Novel;
            addWorkshopNovel({ ...payload, chapters: [] })
            navigation.replace("ChapterWorkshop", { novelId: result.id });
        },
        successMessage: "Nouvelle histoire créée avec succès!"
    });
    const { call: callEditNovel, isLoading: isEditNovelLoading } = useCall(editNovel, {
        onSuccess(result) {
            const payload = result as Novel;
            updateWorkshopNovel(payload.id, payload);
            navigation.pop();
        },
        successMessage: "Votre histoire a étée modifiée avec succès!"
    });

    const [selectedGenre, setSelectedGenre] = useState<NovelGenre>(novel?.genre);
    const [isMature, setIsMature] = useState(Boolean(novel?.isMature));
    const { imgUri, pickImage } = useImagePicker();

    return (
        <KeyboardAwareScrollView style={{ flex: 1, backgroundColor: "white" }}>
            <Formik
                validationSchema={novelSchema}
                initialValues={{
                    title: novel?.title,
                    description: novel?.description,
                    genre: novel?.genre,
                    isMature,
                }} onSubmit={async (values: CreateNovelInput) => {
                    let coverImg = null;
                    values.isMature = Boolean(values.isMature);
                    if (imgUri) {
                        const response = await fetch(imgUri);
                        coverImg = await response.blob();
                    }
                    if (mode === "create") {
                        await call({ coverImg: coverImg, ...values })
                    } else {
                        await callEditNovel({
                            coverImg, ...values,
                            novelId: novel.id
                        })
                    }
                }}>
                {
                    ({ handleSubmit, handleChange, values, errors }) => (
                        <View style={{ flex: 1, justifyContent: "space-between", }}>
                            <View>
                                <View style={{ flexDirection: "column", justifyContent: "space-between", paddingHorizontal: 30, gap: 10, }}>
                                    <View style={{ flex: 0.3 }}>
                                        <TouchableOpacity onPress={() => pickImage([9, 16])}>
                                            <Avatar
                                                containerStyle={{ backgroundColor: "grey", height: 125, width: 100, borderRadius: 10 }}
                                                avatarStyle={{ borderRadius: 10, resizeMode: "cover" }}
                                                source={{ uri: novel?.coverUrl || imgUri }}
                                            />
                                        </TouchableOpacity>
                                    </View>

                                    <View style={{ flex: 0.7 }}>
                                        <TextInput errorMessage={errors.title} value={values.title} onChangeText={handleChange("title")} label="Titre" placeholder="Veuillez saisir le titre du roman" />
                                    </View>
                                </View>

                                <Wrapper horizontalPadding={30}>
                                    <TextInput errorMessage={errors.description} value={values.description} onChangeText={handleChange("description")} name="description" label="Resumé de l'histoire" placeholder="Veuillez donner le resumé de l'histoire..." multiline numberOfLines={8} />
                                    <TouchableOpacity onPress={() => setGenreSheetIsVisible(true)}>
                                        <TextInput errorMessage={errors.genre} value={config.novelGenresMap[selectedGenre]?.title} name="genre" label="Genre de l'histoire" placeholder="Veuillez choisir le genre de l'histoire" disabled />
                                    </TouchableOpacity>
                                </Wrapper>

                                <Wrapper horizontalPadding={30}>
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

                            <View style={{ paddingHorizontal: 30 }}>
                                <Button loading={isLoading || isEditNovelLoading} onPress={() => handleSubmit()} buttonStyle={{ backgroundColor: "black", borderRadius: 10 }}>Sauvegarder</Button>
                            </View>

                            <CardBottomSheet isVisible={genreSheetIsVisible} onBackdropPress={() => setGenreSheetIsVisible(false)}>
                                <FlatList
                                    data={config.genreSelectOptions} renderItem={({ index, item: { title, value } }) => (
                                        <CheckBox
                                            key={index}
                                            checked={selectedGenre === value} title={title} onPress={() => {
                                                handleChange("genre")(value);
                                                setSelectedGenre(value);
                                                setGenreSheetIsVisible(false);
                                            }} />
                                    )} />
                            </CardBottomSheet>
                        </View>
                    )
                }
            </Formik>
        </KeyboardAwareScrollView>
    )
}