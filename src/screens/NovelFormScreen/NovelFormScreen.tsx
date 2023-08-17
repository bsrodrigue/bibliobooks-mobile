import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Avatar, FAB, Icon, LinearProgress } from "@rneui/base";
import { useTheme } from "@rneui/themed";
import { Formik } from "formik";
import { useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import PagerView from "react-native-pager-view";
import * as Yup from "yup";
import { CreateNovelInput, createNovel, editNovel } from "../../api/novels";
import useCall from "../../api/useCall";
import { CheckBox, NovelGenreGrid, TextInput, Wrapper } from "../../components";
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
    const { theme: { colors: { error, greyOutline, primary, black } } } = useTheme();
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
    const [currentPage, setCurrentPage] = useState(0);

    const _pagerRef = useRef(null);

    const stepData = [
        {
            iconName: "image",
            stepTitle: "Couverture",
            iconSet: "font-awesome-5",
        },
        {
            iconName: "book",
            stepTitle: "Titre et description",
            iconSet: "font-awesome-5",
        },
        {
            iconName: "information-circle",
            stepTitle: "Informations sur votre livre",
            iconSet: "ionicon",
        },
    ]

    return (
        <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }} style={{ flex: 1, backgroundColor: "white" }}>
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
                        <View style={{ flex: 1, }}>
                            <View style={{ paddingHorizontal: 35, }}>
                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 10, height: 40 }}>
                                    <Icon type={stepData[currentPage].iconSet} name={stepData[currentPage].iconName} />
                                    <LinearProgress style={{ borderRadius: 25, flex: 1 }} value={((currentPage + 1) * 33) / 100} variant="determinate" color={primary} />
                                </View>
                                <Text style={{ fontFamily: "Quicksand-700", opacity: 0.5 }}>Etape: {stepData[currentPage].stepTitle}</Text>
                            </View>
                            <PagerView ref={_pagerRef} onPageSelected={(e) => setCurrentPage(e.nativeEvent.position)} style={{ flex: 1 }} initialPage={0}>
                                {/* Cover */}
                                <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                                    <TouchableOpacity style={{
                                        height: "90%",
                                        width: "80%"
                                    }} onPress={() => pickImage([9, 16])}>
                                        <Avatar
                                            containerStyle={{ backgroundColor: "grey", borderRadius: 10, height: "100%", width: "100%" }}
                                            avatarStyle={{ borderRadius: 10, resizeMode: "cover" }}
                                            source={{ uri: novel?.coverUrl || imgUri }}
                                        />
                                    </TouchableOpacity>

                                </View>

                                {/* Descripion & Genre */}
                                <View style={{ flex: 1, justifyContent: "center" }}>
                                    <Wrapper horizontalPadding={30}>
                                        <TextInput
                                            maxLength={50}
                                            errorMessage={errors.title}
                                            value={values.title}
                                            onChangeText={handleChange("title")}
                                            placeholder="Titre" />
                                        <TextInput maxLength={250} errorMessage={errors.description}
                                            value={values.description} onChangeText={handleChange("description")}
                                            name="description" label="Resumé de l'histoire"
                                            placeholder="Veuillez donner le resumé de l'histoire..." multiline numberOfLines={8} />
                                    </Wrapper>
                                </View>

                                {/*  Informations */}
                                <View style={{ flex: 1, justifyContent: "center" }}>
                                    <Wrapper horizontalPadding={30}>
                                        <NovelGenreGrid onPressItem={(genre) => {
                                            handleChange("genre")(genre);
                                        }} />
                                        <View style={{
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            marginVertical: 10,
                                            paddingVertical: 12,
                                            paddingHorizontal: 20,
                                            borderRadius: 10,
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
                            </PagerView>
                            <FAB
                                loading={isLoading || isEditNovelLoading}
                                onPress={() => {
                                    if (currentPage !== 2) {
                                        _pagerRef?.current?.setPage(currentPage + 1);
                                        return;
                                    }
                                    handleSubmit();
                                }}
                                icon={<Icon name={currentPage !== 2 ? "arrow-right" : "check"} type="font-awesome-5" color="white" />}
                                color={black}
                                placement="right" />
                        </View>
                    )
                }

            </Formik>

        </KeyboardAwareScrollView>
    )
}
