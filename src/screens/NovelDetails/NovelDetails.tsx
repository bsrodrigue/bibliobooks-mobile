import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Avatar, Badge, BottomSheet, Card, FAB, Icon } from "@rneui/base";
import { useTheme } from "@rneui/themed";
import { useState } from "react";
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import readingTime from "reading-time";
import { addToLibrary, removeFromLibrary } from "../../api/novels";
import { Button, RecommendationCarousel } from "../../components";
import { notify } from "../../lib";
import { useLibrary } from "../../providers/LibraryProvider";
import { RootStackParamList } from "../../types";
import { ReaderNovel } from "../../types/models";

function getNovelStats(novel: ReaderNovel) {
    let reads = 0;
    let likes = 0;
    let comments = 0;

    for (const chapter of novel.chapters) {
        reads += chapter.reads?.length || 0;
        likes += chapter.likes?.length || 0;
        comments += chapter.comments?.length || 0;
    }

    return { reads, likes, comments };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

type NovelDetailsScreenProps = NativeStackScreenProps<RootStackParamList, 'NovelDetails'>;

export default function NovelDetailsScreen({ navigation, route }: NovelDetailsScreenProps) {
    const { novel } = route.params;
    const { title, description, coverUrl, chapters, genre, isMature, owner } = novel;
    const { theme: { colors: { black, primary } } } = useTheme();
    const [chapterListIsVisible, setChapterListIsVisible] = useState(false);
    const { library, addLibraryNovel, removeLibraryNovel, isLoading } = useLibrary();
    const [isLibraryLoading, setIsLibraryLoading] = useState(false);
    const { reads, likes, comments } = getNovelStats(novel);

    const isInLibrary = () => library?.novels?.find((n) => n.id === novel.id) !== undefined;

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: black }]}>
            <View style={{ paddingVertical: 20, paddingHorizontal: 40, flexDirection: "row", justifyContent: "space-between" }}>
                <View style={{ justifyContent: "space-between" }}>
                    <View style={{ alignItems: "flex-start", justifyContent: "space-between" }}>
                        <Text style={{ width: 150, fontSize: 18, color: "white", fontFamily: "Quicksand-700", marginBottom: 10 }}>{title}</Text>
                        <Text style={{ color: "white", fontSize: 16, opacity: 0.5 }}>{chapters.length} chapitre{chapters.length > 1 ? "s" : ""}</Text>
                        {
                            isMature && (
                                <Badge status="error" value="Mature" badgeStyle={{ borderWidth: 0, marginVertical: 10 }} />
                            )
                        }
                        <TouchableOpacity
                            onPress={() => {
                                navigation.replace("ViewAccount", {
                                    user: owner
                                })
                            }}
                            style={{ flexDirection: "row", alignItems: "center", gap: 10, marginVertical: 10 }}>
                            <Avatar
                                size={50}
                                rounded
                                source={owner?.avatarUrl ? { uri: owner?.avatarUrl } : require("../../assets/illustrations/placeholder.png")}
                            />
                            <View>
                                <Text style={{ fontSize: 18, fontFamily: "Quicksand-700", color: "white" }}>{owner?.username}</Text>
                                <Text style={{ opacity: 0.6, fontFamily: "Quicksand", color: "white" }}>{owner?.creations?.length} oeuvres</Text>
                            </View>
                        </TouchableOpacity>
                        <Text style={{ color: "white", fontStyle: "italic" }}>{genre}</Text>
                    </View>

                </View>
                <Image style={{ width: 100, height: 150, borderRadius: 10, }} resizeMode="cover" source={{ uri: coverUrl }} />
            </View>
            <View style={{ flex: 1 }}>
                <Card containerStyle={{ margin: 0, borderTopStartRadius: 25, borderTopEndRadius: 25, flex: 1, paddingHorizontal: 0 }}>
                    <View>
                        <View >
                            <View style={{ paddingHorizontal: 40 }}>
                                <View style={{ flexDirection: "row", justifyContent: "center", marginVertical: 10 }}>
                                    <View style={{ width: 100, alignItems: "center" }}>
                                        <Icon name="eye" solid type="font-awesome-5" size={20} />
                                        <Text style={{ fontFamily: "Quicksand-700", fontSize: 12, marginTop: 5 }}>{reads} Lectures</Text>
                                    </View>
                                    <View style={{ width: 100, alignItems: "center" }}>
                                        <Icon name="star" solid type="font-awesome-5" size={20} />
                                        <Text style={{ fontFamily: "Quicksand-700", fontSize: 12, marginTop: 5 }}>{likes} Étoiles</Text>
                                    </View>
                                    <View style={{ width: 100, alignItems: "center" }}>
                                        <Icon name="comments" solid type="font-awesome-5" size={20} />
                                        <Text style={{ fontFamily: "Quicksand-700", fontSize: 12, marginTop: 5 }}>{comments} Commentaires</Text>
                                    </View>
                                </View>
                                <View style={{ marginVertical: 20, flexDirection: "row", gap: 5 }}>
                                    <Button onPress={() => { navigation.navigate("Reader", { novel }) }} size="sm" containerStyle={{ flex: 1 }}>Lire</Button>
                                    <Button disabled size="sm" buttonStyle={{ backgroundColor: primary }} containerStyle={{ flex: 1 }}>Partager</Button>
                                </View>

                                <Text style={{ fontSize: 18, fontFamily: "Quicksand-700", marginBottom: 10 }}>Synopsis</Text>
                                <ScrollView contentContainerStyle={{
                                    paddingVertical: 5,
                                    paddingHorizontal: 5,
                                }} style={{ maxHeight: 90 }}>
                                    <Text style={{ opacity: 0.6, lineHeight: 16, fontFamily: "Quicksand", }}>{description}</Text>
                                </ScrollView>
                                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginVertical: 10 }}>
                                    <Text style={{ fontFamily: "Quicksand-700", fontSize: 18 }}>{chapters.length}{" "}chapitre{chapters.length > 1 ? "s" : ""}</Text>
                                    <TouchableOpacity onPress={() => setChapterListIsVisible(true)} >
                                        <Text style={{ opacity: 0.5, fontFamily: "Quicksand-700" }}>Voir tous les chapitres</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={{ backgroundColor: "#D9D9D9", opacity: 0.35, height: 8, marginVertical: 10 }} />

                            <View style={{ paddingHorizontal: 40 }}>
                                <RecommendationCarousel
                                    showDescription={false}
                                    containerStyle={{
                                        borderWidth: 0,
                                        shadowOpacity: 0
                                    }}
                                    loading title="Histoires similaires" novels={[novel]} />
                            </View>

                        </View>
                    </View>

                </Card>
                <FAB
                    color={isInLibrary() ? primary : black}
                    loading={isLoading || isLibraryLoading}
                    disabled={isLoading || isLibraryLoading}
                    icon={<Icon color="white" name="book" type="font-awesome-5" />}
                    onPress={async () => {
                        try {
                            setIsLibraryLoading(true);
                            const callback =
                                isInLibrary() ?
                                    async () => {
                                        await removeFromLibrary(novel.id)
                                        removeLibraryNovel(novel.id);
                                        notify.success(`${novel.title} a été retiré de votre bibliothèque`)
                                    } :
                                    async () => {
                                        await addToLibrary(novel.id)
                                        addLibraryNovel(novel);
                                        notify.success(`${novel.title} a été ajouté à votre bibliothèque`)
                                    }

                            await callback();
                        } catch (error) {
                            notify.error("Une erreur est survenue...");
                        } finally {
                            setIsLibraryLoading(false);
                        }

                    }}
                    placement="right"
                    containerStyle={{ borderRadius: 10 }}
                />
            </View>
            <BottomSheet onBackdropPress={() => setChapterListIsVisible(false)} isVisible={chapterListIsVisible}>
                <Card containerStyle={{ margin: 0, borderTopStartRadius: 25, borderTopEndRadius: 25, flex: 1, paddingHorizontal: 40, }}>
                    <FlatList
                        ListHeaderComponent={<Text style={{ fontFamily: "Quicksand-700", fontSize: 18, marginVertical: 15 }}>{chapters.length}{" "}chapitres</Text>}
                        showsVerticalScrollIndicator={false} style={{ height: 300 }} data={chapters} renderItem={({ index, item }) => (
                            <TouchableOpacity onPress={() => { navigation.navigate("Reader", { novel }) }} key={item.id} style={{ paddingVertical: 12 }}>
                                <Text style={{ fontFamily: "Quicksand-600" }}>{item.title}</Text>
                                <Text style={{ fontFamily: "Quicksand-500", fontSize: 12, opacity: 0.5 }}>Nombre de mots {readingTime(item.body).words}</Text>
                            </TouchableOpacity>)}
                    />
                </Card>
            </BottomSheet>
        </SafeAreaView>
    )
}