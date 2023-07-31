import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ScrollView, Text, View } from "react-native";
import { RichEditor } from "react-native-pell-rich-editor";
import initialCSSText from "../../config/richtext";
import { RootStackParamList } from "../../types";

type ChapterPreviewScreenProps = NativeStackScreenProps<RootStackParamList, 'ChapterPreview'>;

export default function ChapterPreviewScreen({ navigation, route: { params: { chapter } } }: ChapterPreviewScreenProps) {
    return (
        <View style={{ flex: 1, backgroundColor: "white", paddingHorizontal: 25, paddingVertical: 5 }}>
            <View style={{ flexDirection: "row", paddingVertical: 10, justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" }}>
                <Text style={{ fontFamily: "Quicksand-700", fontSize: 20 }}>{chapter.title}</Text>
            </View>
            <ScrollView style={{ flex: 1 }}>
                <RichEditor
                    disabled
                    useContainer
                    scrollEnabled
                    editorStyle={initialCSSText}
                    androidLayerType="hardware"
                    contentMode="mobile"
                    initialContentHTML={chapter.body}
                />
            </ScrollView>
        </View>
    )
}