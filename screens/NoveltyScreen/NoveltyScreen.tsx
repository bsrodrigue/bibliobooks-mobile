import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { NovelList } from "../../components";
import { useLatestNovels } from "../../hooks/api/reader";
import { RootStackParamList } from "../../types";
import { ReaderNovel } from "../../types/models";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
});

type NoveltyScreenProps = NativeStackScreenProps<RootStackParamList, 'Novelty'>;

export default function NoveltyScreen({ navigation }: NoveltyScreenProps) {
    const { getLatestNovels, latestNovels, isLoading } = useLatestNovels();

    useEffect(() => {
        getLatestNovels();
    }, []);

    return (
        <View style={styles.container}>
            <NovelList
                refreshing={isLoading}
                onRefresh={getLatestNovels}
                novels={latestNovels} onPressItem={(novel: ReaderNovel) => {
                    navigation.navigate("NovelDetails", { novel })
                }}
            />
        </View>
    )
}