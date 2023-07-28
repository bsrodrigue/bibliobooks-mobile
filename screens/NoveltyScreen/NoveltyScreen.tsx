import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useTheme } from "@rneui/themed";
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
        marginTop: 10,
        justifyContent: "center",
        alignItems: "center",
    },
});

type LibraryScreenProps = NativeStackScreenProps<RootStackParamList, 'Library'>;

export default function LibraryScreen({ navigation }: LibraryScreenProps) {
    const { theme: { colors: { primary } } } = useTheme();
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