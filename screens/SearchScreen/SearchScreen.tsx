import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useDebounce } from "usehooks-ts";
import { searchNovel } from "../../api/novels";
import { Header, NovelList } from "../../components";
import { RootStackParamList } from "../../types";
import { ReaderNovel } from "../../types/models";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

type SearchScreenProps = NativeStackScreenProps<RootStackParamList, 'Search'>;

export default function SearchScreen({ navigation }: SearchScreenProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedValue = useDebounce<string>(searchTerm, 800);
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const search = async (searchTerms: string) => {
        try {
            setLoading(true);
            const result = await searchNovel({ searchTerms });
            result?.length !== 0 && setSearchResults(result);
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
            <Header loading={loading} searchMode onChange={(value) => setSearchTerm(value)} />
            <View style={{ paddingHorizontal: 20, flex: 1 }}>
                <NovelList onRefresh={() => search(searchTerm)}
                    novels={searchResults} onPressItem={(novel: ReaderNovel) => {
                        navigation.navigate("NovelDetails", { novel })
                    }}
                />
            </View>
        </View>

    )
}