import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useTheme } from "@rneui/themed";
import { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { RootStackParamList } from "../../types";
import { ReaderNovel } from "../../types/models";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        marginTop: 10
    },
});

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: HomeScreenProps) {
    const { theme: { colors: { primary } } } = useTheme();
    const [latestRead, setLatestRead] = useState<ReaderNovel>(null);

    return (
        <ScrollView style={styles.container}>
            {/* {
                <LatestReadCard
                    title="Dernière lecture"
                    time={mom(latestActivity.createdAt).fromNow()}
                    novel={latestRead}
                    onResume={(novel) => {
                        const result = novel.chapters.filter((chapter) => chapter.id === latestActivity.options?.chapterId)
                        result.length && navigation.navigate("Reader", { novel, chapter: result[0] });
                    }}
                />
            } */}

            {/* <StoryRecommendation
                title="Le jardin des plaisirs"
                subtitle="Laissez-vous charmer par les rondeurs de Sophia"
                novel={ }
                onPress={() => {
                    // navigation.navigate("NovelDetails", {  });
                }}
            />
            <RecommendationCarousel title="Les histoires les plus populaires" novels={ } />

            <StoryRecommendation
                title="Les totems des anciens"
                subtitle="Renouez avec vos racines"
                novel={ } /> */}
        </ScrollView >
    )
}