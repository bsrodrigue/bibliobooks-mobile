import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { NovelGrid } from "../../components";
import { useLibrary } from "../../providers/LibraryProvider";
import { RootStackParamList } from "../../types";
import { LibraryNovel } from "../../types/models";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
});

type NoveltyScreenProps = NativeStackScreenProps<RootStackParamList, 'Novelty'>;

export default function NoveltyScreen({ navigation }: NoveltyScreenProps) {
    const { fetchLibraryNovels, libraryNovels, isLoading } = useLibrary();

    useEffect(() => {
        fetchLibraryNovels();
    }, []);

    return (
        <View style={styles.container}>
            <NovelGrid
                refreshing={isLoading}
                onRefresh={fetchLibraryNovels}
                novels={libraryNovels}
                onNovelPress={(novel: LibraryNovel) => {
                    navigation.navigate("Reader", { novel, chapter: novel.chapters[0] })
                }}
                onLastItemPress={() => {
                    navigation.navigate("Novelty");
                }} />
        </View>
    )
}