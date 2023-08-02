import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { and, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useDebounce } from "usehooks-ts";
import { getEntitiesWhereOr } from "../../api/base";
import { getReaderNovelFromNovel } from "../../api/novels";
import { Header, NovelList } from "../../components";
import { mom } from "../../lib/moment";
import { useSession } from "../../providers";
import { RootStackParamList } from "../../types";
import { Novel, ReaderNovel } from "../../types/models";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

type SearchScreenProps = NativeStackScreenProps<RootStackParamList, 'Search'>;

export default function SearchScreen({ navigation }: SearchScreenProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedValue = useDebounce<string>(searchTerm, 800);
    const { session: { userProfile: { birthdate } } } = useSession();
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const birth = mom(birthdate.toString().split(",")[0], "MM-DD-YYYY");
    const isAdult = mom().diff(birth, "year") >= 18;

    const search = async (searchTerm: string) => {
        try {
            setLoading(true);
            const novels = await getEntitiesWhereOr<Novel>("novel",
                and(
                    where("status", "==", "published"),
                    where("title", ">=", searchTerm),
                )
            );
            const results = [];
            for (const novel of novels) {
                const readerNovel = await getReaderNovelFromNovel(novel);
                results.push(readerNovel);
            }
            setSearchResults(results);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        debouncedValue && search(debouncedValue);
    }, [debouncedValue])


    return (
        <View style={styles.container}>
            <Header searchMode onChange={(value) => setSearchTerm(value)} />
            <View style={{ paddingHorizontal: 20, flex: 1 }}>
                <NovelList
                    refreshing={loading}
                    onRefresh={() => search(searchTerm)}
                    novels={searchResults} onPressItem={(novel: ReaderNovel) => {
                        navigation.navigate("NovelDetails", { novel })
                    }}
                />
            </View>
        </View>

    )
}