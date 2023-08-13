import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BottomSheet, Card, Icon, Tab } from "@rneui/base";
import { useTheme } from "@rneui/themed";
import { useRef, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { Richtext } from "../../components";
import { useChapter } from "../../hooks/api/reader";
import { useSession } from "../../providers";
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
    const { session: { profile: { id } } } = useSession();
    const [lightMode, setLightMode] = useState(true);
    const chapter = novel.chapters[currentChapterIndex];
    const readerRef = useRef(null);
    const { like, unlike, isLoading } = useChapter(chapter);

    // const liked = chapter?.likes.length !== 0 && chapter.likes.find((like) => like?.owner?.id === id) !== undefined;
    const content = `<h1>${chapter?.title}</h1>${chapter?.body}`;

    return (
        <View style={{ flex: 1, backgroundColor: lightMode ? "white" : black, paddingHorizontal: 25, paddingVertical: 5 }}>
            <View style={{ flexDirection: "row", paddingVertical: 10, justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" }}>
                <Text style={{ color: lightMode ? black : "white", fontFamily: "Quicksand-700", fontSize: 20 }}>Livre</Text>
                <Text style={{ color: lightMode ? black : "white", fontFamily: "Quicksand-500", fontSize: 15, opacity: 0.5 }}>{novel.title}</Text>
            </View>

            <ChapterStats
                lightMode={lightMode}
                likes={chapter?.likes?.length || 0}
                reads={chapter?.reads?.length || 0}
                comments={chapter?.comments?.length || 0}
            />

            <Richtext ref={readerRef} lightMode={lightMode} initialContentHTML={content} disabled />

            {/* <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 10 }}>
                {
                    !isFirst && (
                        <TouchableOpacity onPress={onPrevious}>
                            <Icon name="arrow-left" type="font-awesome-5" />
                        </TouchableOpacity>
                    )
                }
                <TouchableOpacity onPress={() => setChapterListIsVisible(true)}>
                    <Icon name="list" type="font-awesome-5" />
                </TouchableOpacity>
                {
                    !isLast && (
                        <TouchableOpacity onPress={onNext}>
                            <Icon name="arrow-right" type="font-awesome-5" />
                        </TouchableOpacity>
                    )
                }
            </View> */}
            <BottomSheet onBackdropPress={() => setChapterListIsVisible(false)} isVisible={chapterListIsVisible}>
                <Card containerStyle={{ margin: 0, borderTopStartRadius: 25, borderTopEndRadius: 25, flex: 1, paddingHorizontal: 40, }}>
                    <FlatList
                        ListHeaderComponent={<Text style={{ fontFamily: "Quicksand-700", fontSize: 18, marginVertical: 15 }}>{novel.chapters.length}{" "}chapitres</Text>}
                        showsVerticalScrollIndicator={false} style={{ height: 300 }} data={novel.chapters} renderItem={({ index, item }) => (
                            <TouchableOpacity
                                onPress={() => {
                                    setCurrentChapterIndex(item);
                                }}
                                key={item.id} style={{ paddingVertical: 12 }}>
                                <Text style={{ fontFamily: "Quicksand-600" }}>{item.title}</Text>
                            </TouchableOpacity>)}
                    />
                </Card>
            </BottomSheet>

            <Tab
                containerStyle={{
                    justifyContent: "center",
                    alignItems: "center",
                    paddingVertical: 8,
                }} disableIndicator>
                <Tab.Item>
                    <TouchableOpacity onPress={() => like()}>
                        <Icon type="ionicon" name="star-outline" />
                    </TouchableOpacity>
                </Tab.Item>
                <Tab.Item
                    title="0"
                    titleStyle={{ fontSize: 10, color: black }}
                    icon={{ name: 'chatbox', type: 'ionicon' }}
                />
                <Tab.Item
                    title="0"
                    titleStyle={{ fontSize: 10, color: black }}
                    icon={{ name: 'share-social', type: 'ionicon' }}
                />
                <Tab.Item>
                    <TouchableOpacity onPress={() => setChapterListIsVisible(true)}>
                        <Icon type="ionicon" name="list" />
                    </TouchableOpacity>
                </Tab.Item>
            </Tab>
        </View>
    )
}