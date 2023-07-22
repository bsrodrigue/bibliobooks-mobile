import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useTheme } from "@rneui/themed";
import { useRef, useState } from "react";
import { SafeAreaView, View } from "react-native";
import { RootStackParamList } from "../../types";
import { RichEditor, RichToolbar } from "react-native-pell-rich-editor";
import { Button, TextInput, Wrapper } from "../../components";

type ChapterFormScreenProps = NativeStackScreenProps<RootStackParamList, 'ChapterForm'>;

export default function ChapterFormScreen({ navigation, route: { params: { mode } } }: ChapterFormScreenProps) {
    const { theme: { colors: { greyOutline, primary } } } = useTheme();
    const [content, setContent] = useState("");
    const _editor = useRef(null);

    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <View style={{ padding: 20, flex: 1 }}>
                <TextInput label="Titre du chapitre" placeholder="Veuillez saisir le titre du chapitre" />
                <RichEditor
                    androidLayerType="hardware"
                    editorStyle={{
                        caretColor: primary
                    }}
                    ref={_editor}
                    initialContentHTML={'Hello <b>World</b> <p>this is a new paragraph</p> <p>this is another new paragraph</p>'}
                    style={{
                        flex: 1,
                        borderWidth: 1,
                        borderColor: greyOutline,
                    }}
                    onChange={(text) => {
                        console.log(text)
                    }}
                />
                <Button
                    title="Sauvegarder"
                    buttonStyle={{ backgroundColor: "black" }}
                    onPress={() => {
                    }}
                    containerStyle={{ marginVertical: 5 }} />
            </View>
            <RichToolbar editor={_editor} selectedIconTint={primary} />
        </View>
    )
}