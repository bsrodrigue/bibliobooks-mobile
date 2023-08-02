import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BottomSheet, Card, FAB, Icon } from "@rneui/base";
import { useTheme } from "@rneui/themed";
import { useEffect, useRef, useState } from "react";
import { FlatList, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { RichEditor } from "react-native-pell-rich-editor";
import { createRead, getLikeByUser, like } from "../../api/novels";
import useCall from "../../api/useCall";
import initialCSSText from "../../config/richtext";
import { useSession } from "../../providers";
import { RootStackParamList } from "../../types";

type ReaderScreenProps = NativeStackScreenProps<RootStackParamList, 'Reader'>;

export default function ReaderScreen({ navigation, route: { params: { novel, chapter } } }: ReaderScreenProps) {
    const { session: { userProfile: { userId } } } = useSession();
    const { theme: { colors: { primary } } } = useTheme();
    const [currentChapter, setCurrentChapter] = useState(chapter);
    const [chapters] = useState(novel.chapters);
    const [chapterListIsVisible, setChapterListIsVisible] = useState(false);
    const [currentChapterIndex, setCurrentChapterIndex] = useState(novel.chapters.indexOf(currentChapter));
    const [liked, setLiked] = useState(false);
    const readerRef = useRef(null);
    const { call: getUserLike, isLoading: isGetUserLikeLoading } = useCall(getLikeByUser, {
        onSuccess(result) {
            setLiked(Boolean(result));
        },
    });
    const { call: toggleLike, isLoading: isToggleLikeLoading } = useCall(like, {
        onSuccess(result) {
            setLiked(result);
        },
    });

    const isLikeButtonLoading = isGetUserLikeLoading || isToggleLikeLoading;
    const content = `<h1>${currentChapter.title}</h1>${currentChapter.body}`;

    const isLast = currentChapterIndex + 1 >= chapters.length;
    const isFirst = currentChapterIndex === 0;

    const onNext = () => {
        if (isLast) {
            return;
        }
        setCurrentChapterIndex(currentChapterIndex + 1)
        setCurrentChapter(chapters[currentChapterIndex + 1]);
    }

    const onPrevious = () => {
        if (isFirst) {
            return;
        }
        setCurrentChapterIndex(currentChapterIndex - 1)
        setCurrentChapter(chapters[currentChapterIndex - 1]);
    }

    useEffect(() => {
        setCurrentChapterIndex(chapters.indexOf(currentChapter));
        readerRef.current?.setContentHTML(content);
    }, [currentChapter, chapters]);

    useEffect(() => {
        getUserLike({ chapterId: currentChapter.id, userId });
        createRead({ userId, chapterId: currentChapter.id });
    }, [currentChapter]);

    return (
        <View style={{ flex: 1, backgroundColor: "white", paddingHorizontal: 25, paddingVertical: 5 }}>
            <View style={{ flexDirection: "row", paddingVertical: 10, justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" }}>
                <Text style={{ fontFamily: "Quicksand-700", fontSize: 20 }}>{currentChapter.title}</Text>
                <Text style={{ fontFamily: "Quicksand-500", fontSize: 15, opacity: 0.5 }}>{novel.title}</Text>
            </View>
            <ScrollView contentContainerStyle={{ flex: 1 }} style={{ flex: 1 }}>
                <RichEditor
                    disabled
                    useContainer
                    scrollEnabled
                    style={{ flex: 1 }}
                    ref={readerRef}
                    editorStyle={initialCSSText}
                    androidLayerType="hardware"
                    contentMode="mobile"
                    initialContentHTML={content}
                />
            </ScrollView>
            <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 10 }}>
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
            </View>
            <FAB
                loading={isLikeButtonLoading}
                disabled={isLikeButtonLoading}
                style={{
                    bottom: 75
                }}
                placement="right"
                color={primary}
                onPress={() => toggleLike({ chapterId: currentChapter.id, userId })}
                icon={<Icon color="white" solid={liked} name="heart" type="font-awesome-5" />} />
            <BottomSheet onBackdropPress={() => setChapterListIsVisible(false)} isVisible={chapterListIsVisible}>
                <Card containerStyle={{ margin: 0, borderTopStartRadius: 25, borderTopEndRadius: 25, flex: 1, paddingHorizontal: 40, }}>
                    <FlatList
                        ListHeaderComponent={<Text style={{ fontFamily: "Quicksand-700", fontSize: 18, marginVertical: 15 }}>{chapters.length}{" "}chapitres</Text>}
                        showsVerticalScrollIndicator={false} style={{ height: 300 }} data={chapters} renderItem={({ index, item }) => (
                            <TouchableOpacity
                                onPress={() => {
                                    setCurrentChapter(item);
                                }}
                                key={item.id} style={{ paddingVertical: 12 }}>
                                <Text style={{ fontFamily: "Quicksand-600" }}>{item.title}</Text>
                            </TouchableOpacity>)}
                    />
                </Card>
            </BottomSheet>
        </View>
    )
}