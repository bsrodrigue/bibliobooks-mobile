import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, View } from "react-native";
import { Richtext } from "../../components";
import { RootStackParamList } from "../../types";

type ChapterPreviewScreenProps = NativeStackScreenProps<RootStackParamList, 'ChapterPreview'>;

export default function ChapterPreviewScreen({ navigation, route: { params: { chapter } } }: ChapterPreviewScreenProps) {
    return (
        <View style={{ flex: 1, backgroundColor: "white", paddingHorizontal: 25, paddingVertical: 5 }}>
            <View style={{ flexDirection: "row", paddingVertical: 10, justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" }}>
                <Text style={{ fontFamily: "Quicksand-700", fontSize: 20 }}>{chapter.title}</Text>
            </View>
            <Richtext disabled lightMode initialContentHTML={chapter?.body} />
        </View>
    )
}