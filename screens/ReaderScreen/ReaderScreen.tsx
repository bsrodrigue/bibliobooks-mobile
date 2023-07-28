import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useTheme } from "@rneui/themed";
import { ScrollView, Text, View } from "react-native";
import { RichEditor } from "react-native-pell-rich-editor";
import { RootStackParamList } from "../../types";
import FontFamilyStylesheet from "./stylesheet";
const fontFamily = 'EB Garamond';
const initialCSSText = { initialCSSText: `${FontFamilyStylesheet}`, contentCSSText: `font-family: ${fontFamily}` }

type ReaderScreenProps = NativeStackScreenProps<RootStackParamList, 'Reader'>;

export default function ReaderScreen({ navigation, route: { params: { novel, chapter } } }: ReaderScreenProps) {
    const { theme: { colors: { greyOutline } } } = useTheme();

    return (
        <View style={{ flex: 1, backgroundColor: "white", paddingHorizontal: 25, paddingVertical: 10 }}>
            <View style={{ flexDirection: "row", paddingVertical: 10, justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" }}>
                <Text style={{ fontFamily: "Quicksand-700", fontSize: 20 }}>{chapter.title}</Text>
                <Text style={{ fontFamily: "Quicksand-500", fontSize: 15, opacity: 0.5 }}>{novel.title}</Text>
            </View>
            <ScrollView style={{ flex: 1 }}>
                <RichEditor
                    disabled
                    useContainer
                    editorStyle={initialCSSText}
                    androidLayerType="hardware"
                    contentMode="mobile"
                    initialContentHTML={`<h1>${chapter.title}</h1>${chapter.body}`}
                />
            </ScrollView>
        </View>
    )
}