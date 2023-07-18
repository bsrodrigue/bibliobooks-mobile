import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useTheme } from "@rneui/themed";
import { useRef } from "react";
import { SafeAreaView, View } from "react-native";
import { RootStackParamList } from "../../types";
import { RichEditor, RichToolbar } from "react-native-pell-rich-editor";
import { TextInput, Wrapper } from "../../components";

type ChapterFormScreenProps = NativeStackScreenProps<RootStackParamList, 'ChapterForm'>;

export default function ChapterFormScreen({ navigation, route: { params: { mode } } }: ChapterFormScreenProps) {
    const { theme: { colors: { greyOutline, primary } } } = useTheme();
    const _editor = useRef(null);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <View style={{ padding: 20, flex: 1 }}>
                <TextInput label="Titre du chapitre" placeholder="Veuillez saisir le titre du chapitre" />
                <RichEditor

                    ref={_editor}
                    initialContentHTML={'Hello <b>World</b> <p>this is a new paragraph</p> <p>this is another new paragraph</p>'}
                    style={{
                        flex: 1,
                        borderWidth: 1,
                        borderColor: greyOutline,
                    }}
                />
            </View>
            <RichToolbar editor={_editor} selectedIconTint={primary} />
        </SafeAreaView>
    )
}