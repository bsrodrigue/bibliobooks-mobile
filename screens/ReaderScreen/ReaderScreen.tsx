import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FAB, Icon } from "@rneui/base";
import { useTheme } from "@rneui/themed";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { RichEditor } from "react-native-pell-rich-editor";
import { createActivity, createRead, getLikeByUser, like } from "../../api/novels";
import useCall from "../../api/useCall";
import { useSession } from "../../providers";
import { RootStackParamList } from "../../types";
import FontFamilyStylesheet from "./stylesheet";
const fontFamily = 'EB Garamond';
const initialCSSText = { initialCSSText: `${FontFamilyStylesheet}`, contentCSSText: `font-family: ${fontFamily}` }

type ReaderScreenProps = NativeStackScreenProps<RootStackParamList, 'Reader'>;

export default function ReaderScreen({ navigation, route: { params: { novel, chapter } } }: ReaderScreenProps) {
    const { session: { userProfile: { userId } } } = useSession();
    const { theme: { colors: { primary } } } = useTheme();
    const [liked, setLiked] = useState(false);
    const { call } = useCall(createActivity);
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

    useEffect(() => {
        call({
            userId, activityType: "reading", entityId: novel.id, options: {
                chapterId: chapter.id
            }
        })
        getUserLike({ chapterId: chapter.id, userId });
        createRead({ userId, chapterId: chapter.id });
    }, []);

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
            <FAB
                loading={isLikeButtonLoading}
                disabled={isLikeButtonLoading}
                placement="right"
                color={primary}
                onPress={() => toggleLike({ chapterId: chapter.id, userId })}
                icon={<Icon color="white" solid={liked} name="heart" type="font-awesome-5" />} />
        </View>
    )
}