import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useTheme } from "@rneui/themed";
import { useRef, useState } from "react";
import { View } from "react-native";
import { RichToolbar } from "react-native-pell-rich-editor";
import { Button, Richtext, TextInput } from "../../components";
import { useChapterWorkshop } from "../../hooks/api/workshop";
import { useWorkshop } from "../../providers/WorkshopProvider";
import { RootStackParamList } from "../../types";
import { Chapter } from "../../types/models";

type ChapterFormScreenProps = NativeStackScreenProps<RootStackParamList, 'ChapterForm'>;

export default function ChapterFormScreen({ navigation, route: { params: { mode, novel, chapter } } }: ChapterFormScreenProps) {
    const { theme: { colors: { primary } } } = useTheme();
    const { create, edit, isCreateLoading, isEditLoading } = useChapterWorkshop();
    const { updateWorkshopNovel, updateWorkshopChapter } = useWorkshop();
    const loading = isCreateLoading || isEditLoading;

    const [content, setContent] = useState(chapter?.body || "");
    const [title, setTitle] = useState(chapter?.title || "");
    const [order, setOrder] = useState(chapter?.order.toString() || (novel.chapters.length + 1).toString())
    const _editor = useRef(null)

    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <View style={{ padding: 20, flex: 1 }}>
                <View style={{ flexDirection: "row", gap: 5 }}>
                    <TextInput containerStyle={{ flex: 0.9 }} onChangeText={setTitle} value={title} label="Titre du chapitre" placeholder="Veuillez saisir le titre du chapitre" />
                    <TextInput containerStyle={{ flex: 0.1 }} keyboardType="numeric" onChangeText={setOrder} value={order} label="#" />
                </View>
                <Richtext
                    placeholder="Commencez à écrire une belle histoire..."
                    ref={_editor}
                    onChange={(text) => setContent(text)}
                    lightMode initialContentHTML={content} />
                <Button
                    title="Sauvegarder"
                    loading={loading}
                    buttonStyle={{ backgroundColor: "black" }}
                    onPress={async () => {
                        if (!title || !content) return;
                        if (mode === "create") {
                            const newChapter = await create({ title, body: content, novelId: novel.id, order: parseInt(order) }) as Chapter;
                            updateWorkshopNovel(novel.id, { chapters: [...novel.chapters, newChapter] });
                        } else {
                            const editedChapter = await edit({ title, body: content, chapterId: chapter.id, order: parseInt(order) }) as Chapter;
                            updateWorkshopChapter(novel, chapter.id, editedChapter);
                        }
                        navigation.pop();
                    }}
                    containerStyle={{ marginVertical: 5 }} />
            </View>
            <RichToolbar editor={_editor} selectedIconTint={primary} />
        </View>
    )
}