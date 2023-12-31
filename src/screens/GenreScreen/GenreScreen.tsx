import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Card } from "@rneui/base";
import { useTheme } from "@rneui/themed";
import { useEffect, useState } from "react";
import { FlatList, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { NovelList } from "../../components";
import { config } from "../../config";
import { useLatestNovels } from "../../hooks/api/reader";
import { RootStackParamList } from "../../types";
import { ReaderNovel } from "../../types/models";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        marginTop: 10
    },
});

type GenreScreenProps = NativeStackScreenProps<RootStackParamList, 'Genre'>;

export default function GenreScreen({ navigation }: GenreScreenProps) {
    const { theme: { colors: { primary } } } = useTheme();
    const [selectedGenre, setSelectedGenre] = useState("action");
    const { getLatestNovels, latestNovels, isLoading } = useLatestNovels();

    useEffect(() => {
        getLatestNovels();
    }, []);

    return (
        <>
            <Card containerStyle={{ margin: 0, padding: 0, paddingVertical: 5 }}>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    ListEmptyComponent={<View style={{ flex: 1 }}>
                        <Text>Il n'y a pas d'histoires dans cette catégorie...</Text>
                    </View>}
                    data={config.genreSelectOptions}
                    contentContainerStyle={{ gap: 10, paddingHorizontal: 10 }}
                    renderItem={({ index, item: { title, cover, value } }) => (
                        <TouchableOpacity
                            onPress={() => setSelectedGenre(value)}
                            style={{ marginVertical: 10 }}
                            key={index}>
                            <ImageBackground
                                borderRadius={10}
                                style={{ height: 55, width: 80, alignItems: "center", justifyContent: "flex-end" }}
                                resizeMode="cover"
                                source={cover}>
                                <View style={{
                                    backgroundColor: selectedGenre === value ? primary : "black", width: "100%",
                                    borderBottomLeftRadius: 10,
                                    borderBottomRightRadius: 10
                                }}>
                                    <Text style={{ color: "white", textAlign: "center", fontSize: 12 }}>{title}</Text>
                                </View>
                            </ImageBackground>
                        </TouchableOpacity>)} />
            </Card>
            <View style={styles.container}>
                <NovelList refreshing={isLoading}
                    onRefresh={getLatestNovels}
                    novels={latestNovels.filter((novel) => novel.genre === selectedGenre)}
                    onPressItem={(novel: ReaderNovel) => {
                        navigation.navigate("NovelDetails", { novel });
                    }} />
            </View>
        </>
    )
}