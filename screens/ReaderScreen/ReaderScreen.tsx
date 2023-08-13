import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BottomSheet, Card, FAB, Icon } from "@rneui/base";
import { useTheme } from "@rneui/themed";
import { useRef, useState } from "react";
import { FlatList, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { RichEditor } from "react-native-pell-rich-editor";
import initialCSSText from "../../config/richtext";
import { RootStackParamList } from "../../types";

type ReaderScreenProps = NativeStackScreenProps<RootStackParamList, 'Reader'>;

export default function ReaderScreen({ navigation, route: { params: { novel } } }: ReaderScreenProps) {
    const { theme: { colors: { black } } } = useTheme();
    const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
    const [chapterListIsVisible, setChapterListIsVisible] = useState(false);
    const [lightMode, setLightMode] = useState(true);
    const chapter = novel.chapters[currentChapterIndex];
    const readerRef = useRef(null);
    const content = `<h1>${chapter.title}</h1>${chapter.body}`;


    return (
        <View style={{ flex: 1, backgroundColor: lightMode ? "white" : black, paddingHorizontal: 25, paddingVertical: 5 }}>
            <View style={{ flexDirection: "row", paddingVertical: 10, justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" }}>
                <Text style={{ color: lightMode ? black : "white", fontFamily: "Quicksand-700", fontSize: 20 }}>{chapter.title}</Text>
                <Text style={{ color: lightMode ? black : "white", fontFamily: "Quicksand-500", fontSize: 15, opacity: 0.5 }}>{novel.title}</Text>
            </View>

            <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: 10, opacity: 0.5 }}>
                <View style={{ width: 75, alignItems: "center", flexDirection: "row", justifyContent: "center", gap: 5 }}>
                    <Icon color={lightMode ? black : "white"} name="eye" solid type="font-awesome-5" size={15} />
                    <Text style={{ fontFamily: "Quicksand-700", fontSize: 12, color: lightMode ? black : "white" }}>{chapter.reads?.length || 0}</Text>
                </View>
                <View style={{ width: 75, alignItems: "center", flexDirection: "row", justifyContent: "center", gap: 5 }}>
                    <Icon color={lightMode ? black : "white"} name="star" solid type="font-awesome-5" size={15} />
                    <Text style={{ fontFamily: "Quicksand-700", fontSize: 12, color: lightMode ? black : "white" }}>{chapter.likes?.length || 0}</Text>
                </View>
                <View style={{ width: 75, alignItems: "center", flexDirection: "row", justifyContent: "center", gap: 5 }}>
                    <Icon color={lightMode ? black : "white"} name="comments" solid type="font-awesome-5" size={15} />
                    <Text style={{ fontFamily: "Quicksand-700", fontSize: 12, color: lightMode ? black : "white" }}>{chapter.comments?.length || 0}</Text>
                </View>
            </View>

            <ScrollView
                contentContainerStyle={{ flex: 1 }}
                style={{ flex: 1 }}>
                <RichEditor
                    disabled
                    useContainer
                    scrollEnabled
                    style={{ flex: 1 }}
                    ref={readerRef}
                    editorStyle={initialCSSText(lightMode)}
                    androidLayerType="hardware"
                    contentMode="mobile"
                    initialContentHTML={content}
                />
            </ScrollView>
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
            <FAB placement="right"
                onPress={() => setLightMode(!lightMode)}
                color={lightMode ? black : "white"}
                icon={<Icon size={18} color={lightMode ? "white" : black}
                    solid name={lightMode ? "moon" : "sun"} type="font-awesome-5" />} />
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
        </View>
    )
}