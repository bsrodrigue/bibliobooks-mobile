import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useTheme } from "@rneui/themed";
import { useRef, useState } from "react";
import { View } from "react-native";
import { RichEditor, RichToolbar } from "react-native-pell-rich-editor";
import { createChapter } from "../../api/novels";
import useCall from "../../api/useCall";
import { Button, TextInput } from "../../components";
import { useSession } from "../../providers";
import { RootStackParamList } from "../../types";

type ChapterFormScreenProps = NativeStackScreenProps<RootStackParamList, 'ChapterForm'>;

export default function ChapterFormScreen({ navigation, route: { params: { mode, novel: { id } } } }: ChapterFormScreenProps) {
    const { theme: { colors: { greyOutline, primary } } } = useTheme();
    const { session: { userProfile: { userId } } } = useSession();
    const { call, isLoading } = useCall(createChapter, {
        onSuccess(result) {
            navigation.pop();
        },

        successMessage: "Chapitre créé avec succès!"
    });
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const _editor = useRef(null);

    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <View style={{ padding: 20, flex: 1 }}>
                <TextInput onChangeText={setTitle} label="Titre du chapitre" placeholder="Veuillez saisir le titre du chapitre" />
                <RichEditor
                    androidLayerType="hardware"
                    editorStyle={{
                        caretColor: primary
                    }}
                    ref={_editor}
                    style={{
                        flex: 1,
                        borderWidth: 1,
                        borderColor: greyOutline,
                    }}
                    onChange={(text) => {
                        setContent(text)
                    }}
                />
                <Button
                    title="Sauvegarder"
                    loading={isLoading}
                    buttonStyle={{ backgroundColor: "black" }}
                    onPress={async () => {
                        await call({ title, body: content, novelId: id, order: 0, userId })
                    }}
                    containerStyle={{ marginVertical: 5 }} />
            </View>
            <RichToolbar editor={_editor} selectedIconTint={primary} />
        </View>
    )
}