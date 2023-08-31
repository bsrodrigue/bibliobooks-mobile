import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BottomSheet, Card, Icon } from "@rneui/base";
import { useTheme } from "@rneui/themed";
import { useEffect, useRef, useState } from "react";
import { FlatList, NativeSyntheticEvent, Text, TouchableOpacity, View } from "react-native";
import PagerView from "react-native-pager-view";
import { Richtext } from "../../components";
import { useChapter } from "../../hooks/api/reader";
import { RootStackParamList } from "../../types";

type ReaderScreenProps = NativeStackScreenProps<RootStackParamList, 'Reader'>;

type ChapterStatsProps = {
    lightMode?: boolean;
    reads: number;
    likes: number;
    comments: number;
};

function ChapterStats({ lightMode, reads, likes, comments }: ChapterStatsProps) {
    const { theme: { colors: { black } } } = useTheme();

    return (
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: 10, opacity: 0.5 }}>
            <View style={{ width: 75, alignItems: "center", flexDirection: "row", justifyContent: "center", gap: 5 }}>
                <Icon color={lightMode ? black : "white"} name="eye" solid type="font-awesome-5" size={15} />
                <Text style={{ fontFamily: "Quicksand-700", fontSize: 12, color: lightMode ? black : "white" }}>{reads}</Text>
            </View>
            <View style={{ width: 75, alignItems: "center", flexDirection: "row", justifyContent: "center", gap: 5 }}>
                <Icon color={lightMode ? black : "white"} name="star" solid type="font-awesome-5" size={15} />
                <Text style={{ fontFamily: "Quicksand-700", fontSize: 12, color: lightMode ? black : "white" }}>{likes}</Text>
            </View>
            <View style={{ width: 75, alignItems: "center", flexDirection: "row", justifyContent: "center", gap: 5 }}>
                <Icon color={lightMode ? black : "white"} name="comments" solid type="font-awesome-5" size={15} />
                <Text style={{ fontFamily: "Quicksand-700", fontSize: 12, color: lightMode ? black : "white" }}>{comments}</Text>
            </View>
        </View>
    )
}

export default function ReaderScreen({ navigation, route: { params: { novel } } }: ReaderScreenProps) {
    const { theme: { colors: { black } } } = useTheme();
    const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
    const [chapterListIsVisible, setChapterListIsVisible] = useState(false);
    const [chapters, setChapters] = useState(novel.chapters);
    const [lightMode, setLightMode] = useState(true);
    const chapter = chapters[currentChapterIndex];
    const _readerRef = useRef(null);
    const { toggleLike, isLiked, likesCount, readsCount } = useChapter(chapter, setChapters);

    function onPageSelected(event: NativeSyntheticEvent<Readonly<{ position: number; }>>) {
        const position = event.nativeEvent.position;
        setCurrentChapterIndex(position);
    }

    useEffect(() => {
    }, [currentChapterIndex]);

    return (
        <View style={{ flex: 1, backgroundColor: lightMode ? "white" : black, paddingHorizontal: 25, paddingVertical: 5 }}>
            <View style={{ flexDirection: "row", paddingVertical: 10, justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" }}>
                <Text style={{ color: lightMode ? black : "white", fontFamily: "Quicksand-700", fontSize: 14 }}>{novel?.title}</Text>
                <TouchableOpacity onPress={() => setLightMode(!lightMode)}>
                    <Icon color={lightMode ? "black" : "white"} name={lightMode ? "sun" : "moon"} type="feather" />
                </TouchableOpacity>
            </View>

            <ChapterStats
                lightMode={lightMode}
                likes={likesCount}
                reads={readsCount}
                comments={chapter?.comments?.length || 0}
            />

            <PagerView ref={_readerRef} style={{ flex: 1 }} onPageSelected={onPageSelected} initialPage={0}>
                {
                    chapters.map((chapter, index) => {
                        const content = `<h1>${chapter?.title}</h1>${chapter?.body}`;
                        return <Richtext key={index} lightMode={lightMode} initialContentHTML={content} disabled />
                    })
                }
            </PagerView>


            <BottomSheet onBackdropPress={() => setChapterListIsVisible(false)} isVisible={chapterListIsVisible}>
                <Card containerStyle={{ margin: 0, borderTopStartRadius: 25, borderTopEndRadius: 25, flex: 1, paddingHorizontal: 40, }}>
                    <FlatList
                        ListHeaderComponent={<Text style={{ fontFamily: "Quicksand-700", fontSize: 18, marginVertical: 15 }}>{novel.chapters.length}{" "}chapitres</Text>}
                        showsVerticalScrollIndicator={false} style={{ height: 300 }} data={novel.chapters} renderItem={({ index, item }) => (
                            <TouchableOpacity
                                onPress={() => {
                                    setCurrentChapterIndex(index);
                                    _readerRef.current?.setPage?.(index);
                                    setChapterListIsVisible(false);
                                }}
                                key={item.id} style={{ paddingVertical: 12 }}>
                                <Text style={{ fontFamily: "Quicksand-600" }}>{item.title}</Text>
                            </TouchableOpacity>)}
                    />
                </Card>
            </BottomSheet>

            <View
                style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 8, }} >
                <TouchableOpacity style={{
                    flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 5
                }} onPress={() => toggleLike()}>
                    <Icon color={lightMode ? "black" : "white"} type="ionicon" name={`star${isLiked ? "" : "-outline"}`} />
                    <Text style={{ color: lightMode ? "black" : "white" }}>{likesCount}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 5
                }}>
                    <Icon color={lightMode ? "black" : "white"} type="ionicon" name="chatbox" />
                    <Text style={{ color: lightMode ? "black" : "white" }}></Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 5
                }}>
                    <Icon color={lightMode ? "black" : "white"} type="ionicon" name="share-social" />
                    <Text style={{ color: lightMode ? "black" : "white" }}></Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 5
                }} onPress={() => setChapterListIsVisible(true)}>
                    <Icon color={lightMode ? "black" : "white"} type="ionicon" name="list" />
                    <Text style={{ color: lightMode ? "black" : "white" }}></Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}