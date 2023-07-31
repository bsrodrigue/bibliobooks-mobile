import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FAB, Icon } from "@rneui/base";
import { useTheme } from "@rneui/themed";
import { useEffect, useRef, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { RichEditor } from "react-native-pell-rich-editor";
import { createRead, getLikeByUser, like } from "../../api/novels";
import useCall from "../../api/useCall";
import { useSession } from "../../providers";
import { RootStackParamList } from "../../types";
import initialCSSText from "../../config/richtext";

type ReaderScreenProps = NativeStackScreenProps<RootStackParamList, 'Reader'>;

export default function ReaderScreen({ navigation, route: { params: { novel, chapter } } }: ReaderScreenProps) {
    const { session: { userProfile: { userId } } } = useSession();
    const { theme: { colors: { primary } } } = useTheme();
    const [currentChapter, setCurrentChapter] = useState(chapter);
    const [chapters, setChapters] = useState(novel.chapters);
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
            <ScrollView style={{ flex: 1 }}>
                <RichEditor
                    disabled
                    useContainer
                    scrollEnabled
                    ref={readerRef}
                    editorStyle={initialCSSText}
                    androidLayerType="hardware"
                    contentMode="mobile"
                    initialContentHTML={content}
                />
            </ScrollView>
            <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 10 }}>
                <TouchableOpacity onPress={() => {
                    setCurrentChapter(chapters[currentChapterIndex - 1]);
                }} >
                    <Icon name="arrow-left" type="font-awesome-5" />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Icon name="list" type="font-awesome-5" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    setCurrentChapter(chapters[currentChapterIndex + 1]);
                }}>
                    <Icon name="arrow-right" type="font-awesome-5" />
                </TouchableOpacity>
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
        </View>
    )
}