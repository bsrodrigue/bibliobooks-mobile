import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Avatar, BottomSheet, Card, Divider, FAB, Icon } from "@rneui/base";
import { useTheme } from "@rneui/themed";
import { useState } from "react";
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParamList } from "../../types";
import { ReaderNovel } from "../../types/models";

function getNovelStats(novel: ReaderNovel) {
    let reads = 0;
    let likes = 0;
    let comments = 0;

    console.log(novel);
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
        paddingTop: 40,
    },
});

type NovelDetailsScreenProps = NativeStackScreenProps<RootStackParamList, 'NovelDetails'>;

export default function NovelDetailsScreen({ navigation, route }: NovelDetailsScreenProps) {
    const { novel } = route.params;
    const { title, description, coverUrl, chapters, id, genre, isMature, owner: { avatarUrl, username, creations } } = novel;
    const { theme: { colors: { black, primary } } } = useTheme();
    const [chapterListIsVisible, setChapterListIsVisible] = useState(false);
    // const { novelIdentifiers, addLibraryNovel, removeLibraryNovel } = useLibrary();
    const [isLibraryLoading, setIsLibraryLoading] = useState(false);
    const { reads, likes, comments } = getNovelStats(novel);

    // const isInLibrary = () => novelIdentifiers.includes(novel.id);

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: black }]}>
            <View style={{ flex: 0.25, paddingHorizontal: 40 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <View style={{ justifyContent: "space-between" }}>
                        <View>
                            <Text style={{ width: 150, fontSize: 18, color: "white", fontFamily: "Quicksand-700", marginBottom: 10 }}>{title}</Text>
                            <Text style={{ color: "white", fontSize: 16, opacity: 0.5 }}>{username}</Text>
                        </View>
                        <Text style={{ color: "white", fontStyle: "italic" }}>{genre}</Text>

                    </View>
                    <Image style={{ width: 100, height: 150, borderRadius: 10, }} resizeMode="cover" source={{ uri: coverUrl }} />
                </View>
            </View>
            <View style={{ flex: 0.75 }}>
                <Card containerStyle={{ margin: 0, borderTopStartRadius: 10, borderTopEndRadius: 10, flex: 1, paddingHorizontal: 0 }}>
                    <View>
                        <View >
                            <View style={{ paddingHorizontal: 40 }}>
                                <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: 10 }}>
                                    <View style={{ width: 50, }}>
                                        <Icon name="eye" solid type="font-awesome-5" size={20} containerStyle={{ alignSelf: "flex-start" }} />
                                        <Text style={{ alignSelf: "flex-end", fontFamily: "Quicksand-700", fontSize: 16 }}>{reads}</Text>
                                    </View>
                                    <View style={{ width: 50, }}>
                                        <Icon name="star" solid type="font-awesome-5" size={20} containerStyle={{ alignSelf: "flex-start" }} />
                                        <Text style={{ alignSelf: "flex-end", fontFamily: "Quicksand-700", fontSize: 16 }}>{likes}</Text>
                                    </View>
                                    <View style={{ width: 50, }}>
                                        <Icon name="comments" solid type="font-awesome-5" size={20} containerStyle={{ alignSelf: "flex-start" }} />
                                        <Text style={{ alignSelf: "flex-end", fontFamily: "Quicksand-700", fontSize: 16 }}>{comments}</Text>
                                    </View>

                                </View>
                                <Divider style={{ marginVertical: 15, opacity: 0.5 }} />
                                <Text style={{ fontSize: 18, fontFamily: "Quicksand-700", marginBottom: 10 }}>Synopsis</Text>
                                <ScrollView style={{ maxHeight: 90 }}>
                                    <Text style={{ opacity: 0.6, lineHeight: 16, fontFamily: "Quicksand", }}>{description}</Text>
                                </ScrollView>
                                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginVertical: 10 }}>
                                    <Text style={{ fontFamily: "Quicksand-700", fontSize: 18 }}>{chapters.length}{" "}chapitres</Text>
                                    <TouchableOpacity onPress={() => setChapterListIsVisible(true)} >
                                        <Text style={{ opacity: 0.5, fontFamily: "Quicksand-700" }}>Voir tous les chapitres</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={{ backgroundColor: "#D9D9D9", opacity: 0.35, height: 8, marginVertical: 5 }} />

                            <View style={{ paddingHorizontal: 40 }}>
                                <Text style={{ fontSize: 18, fontFamily: "Quicksand-700", marginBottom: 10 }}>L'auteur</Text>
                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                    <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                                        <Avatar
                                            size={50}
                                            rounded
                                            source={{ uri: avatarUrl }}
                                        />

                                        <View>
                                            <Text style={{ fontSize: 18, fontFamily: "Quicksand-700" }}>{username}</Text>
                                            <Text style={{ opacity: 0.6, fontFamily: "Quicksand" }}>{creations?.length} oeuvres</Text>
                                        </View>

                                    </View>
                                    <TouchableOpacity>
                                        <Text style={{ opacity: 0.5, fontFamily: "Quicksand-700" }}>Découvrir</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>

                </Card>
                {/* <FAB
                    color={black}
                    loading={isLibraryLoading}
                    disabled={isLibraryLoading}
                    icon={<Icon color="white" name={isInLibrary() ? "minus" : "plus"} type="font-awesome-5" />}
                    onPress={async () => {
                        try {
                            setIsLibraryLoading(true);
                            const callback =
                                isInLibrary() ?
                                    async () => {
                                        // await removeFromLibrary({ novelId: novel.id, userId })
                                        removeLibraryNovel(novel.id);
                                    } :
                                    async () => {
                                        // await addToLibrary({ novelId: novel.id, userId })
                                        addLibraryNovel(novel);
                                    }

                            await callback();
                        } catch (error) {
                            notify.error("Une erreur est survenue...");
                        } finally {
                            setIsLibraryLoading(false);
                        }

                    }}
                    placement="right"
                    style={{ bottom: 75, }}
                    containerStyle={{ borderRadius: 10 }}
                /> */}
                <FAB color={black}
                    onPress={() => {
                        navigation.navigate("Reader", { novel, chapter: novel.chapters[0] })
                    }}
                    icon={<Icon color="white" name="book" type="font-awesome-5" />} placement="right"
                    containerStyle={{ borderRadius: 10 }}
                />
            </View>
            <BottomSheet onBackdropPress={() => setChapterListIsVisible(false)} isVisible={chapterListIsVisible}>
                <Card containerStyle={{ margin: 0, borderTopStartRadius: 25, borderTopEndRadius: 25, flex: 1, paddingHorizontal: 40, }}>
                    <FlatList
                        ListHeaderComponent={<Text style={{ fontFamily: "Quicksand-700", fontSize: 18, marginVertical: 15 }}>{chapters.length}{" "}chapitres</Text>}
                        showsVerticalScrollIndicator={false} style={{ height: 300 }} data={chapters} renderItem={({ index, item }) => (
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate("Reader", { novel, chapter: item })
                                }}
                                key={item.id} style={{ paddingVertical: 12 }}>
                                <Text style={{ fontFamily: "Quicksand-600" }}>{item.title}</Text>
                            </TouchableOpacity>)}
                    />
                </Card>
            </BottomSheet>
        </SafeAreaView>
    )
}