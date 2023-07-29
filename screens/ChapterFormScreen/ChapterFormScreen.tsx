import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useTheme } from "@rneui/themed";
import { useRef, useState } from "react";
import { ScrollView, View } from "react-native";
import { RichEditor, RichToolbar } from "react-native-pell-rich-editor";
import { Button, TextInput } from "../../components";
import { useChapterWorkshop } from "../../hooks/api/workshop";
import { useSession } from "../../providers";
import { RootStackParamList } from "../../types";

type ChapterFormScreenProps = NativeStackScreenProps<RootStackParamList, 'ChapterForm'>;

export default function ChapterFormScreen({ navigation, route: { params: { mode, novel: { id }, chapter } } }: ChapterFormScreenProps) {
    const { theme: { colors: { greyOutline, primary } } } = useTheme();
    const { session: { userProfile: { userId } } } = useSession();
    const { create, edit, isCreateLoading, isEditLoading } = useChapterWorkshop();
    const loading = isCreateLoading || isEditLoading;

    const [content, setContent] = useState(chapter?.body || "");
    const [title, setTitle] = useState(chapter?.title || "");
    const _editor = useRef(null);

    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <View style={{ padding: 20, flex: 1 }}>
                <TextInput onChangeText={setTitle} value={title} label="Titre du chapitre" placeholder="Veuillez saisir le titre du chapitre" />
                <ScrollView style={{ flex: 1, paddingVertical: 5 }}>
                    <RichEditor
                        scrollEnabled
                        useContainer
                        androidLayerType="hardware"
                        initialContentHTML={content}
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
                </ScrollView>

                <Button
                    title="Sauvegarder"
                    loading={loading}
                    buttonStyle={{ backgroundColor: "black" }}
                    onPress={async () => {
                        if (!title || !content) return;
                        if (mode === "create") {
                            await create({ title, body: content, novelId: id, order: 0, userId })
                        } else {
                            await edit({ title, body: content, chapterId: chapter.id })
                        }
                        navigation.pop();
                    }}
                    containerStyle={{ marginVertical: 5 }} />
            </View>
            <RichToolbar editor={_editor} selectedIconTint={primary} />
        </View>
    )
}