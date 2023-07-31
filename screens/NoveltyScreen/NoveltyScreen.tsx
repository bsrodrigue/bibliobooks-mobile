import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, View } from "react-native";
import { NovelList } from "../../components";
import { useLatestNovels } from "../../hooks/api/reader";
import { mom } from "../../lib/moment";
import { useSession } from "../../providers";
import { RootStackParamList } from "../../types";
import { ReaderNovel } from "../../types/models";
import { useEffect } from "react";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
});

type LibraryScreenProps = NativeStackScreenProps<RootStackParamList, 'Library'>;

export default function LibraryScreen({ navigation }: LibraryScreenProps) {
    const { session: { userProfile: { birthdate } } } = useSession();
    const birth = mom(birthdate.toString().split(",")[0], "MM-DD-YYYY");
    const isAdult = mom().diff(birth, "year") >= 18;
    const { getLatestNovels, latestNovels, isLoading } = useLatestNovels({
        omitMatureNovels: !isAdult
    });
    
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