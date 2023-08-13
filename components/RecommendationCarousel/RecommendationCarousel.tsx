import { Card } from "@rneui/base";
import { ReactElement, useState } from "react";
import { FlatList, Image, StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from "react-native";
import { ReaderNovel } from "../../types/models";
import { Button } from "../Button";

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    title: {
        fontFamily: "Quicksand-700",
        fontSize: 18
    },

    body: {
        marginVertical: 10,
        flexDirection: "row",
        gap: 10
    },

    novelTitle: {
        fontFamily: "Quicksand-700",
        fontSize: 12,
        width: 70
    },
    chapterCount: {
        fontFamily: "Quicksand-300",
        fontSize: 12,
        fontStyle: "italic",
        opacity: 0.5,
    },
    novelDescription: {
        maxWidth: 200,
        fontFamily: "Quicksand-600",
        fontSize: 12
    },

    button: {
        backgroundColor: "black",
        borderRadius: 5,
    }
});


type RecommendationCarouselProps = {
    title: string;
    novels?: ReaderNovel[];
    loading?: boolean;
    ListEmptyComponent?: React.ComponentType<any> | ReactElement<any, string | React.JSXElementConstructor<any>>;
    containerStyle?: StyleProp<ViewStyle>;
    card?: boolean;
    showDescription?: boolean;
}

export default function RecommendationCarousel({
    title, novels, loading,
    ListEmptyComponent, containerStyle,
    card, showDescription }: RecommendationCarouselProps) {
    const [selectedNovel, setSelectedNovel] = useState(0);
    const Container = card ? Card : View;

    return (
        <Container
            containerStyle={[{ margin: 0, borderRadius: 10 }, containerStyle]}>
            <View style={styles.header}>
                <Text style={styles.title}>{title}</Text>
            </View>
            <View style={styles.body}>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    ListEmptyComponent={ListEmptyComponent}
                    contentContainerStyle={{
                        gap: 10
                    }} data={novels}
                    renderItem={({ item: { title, chapters, coverUrl }, index }) => (
                        <TouchableOpacity
                            onPress={() => {
                                setSelectedNovel(index);
                            }}
                            style={{ opacity: selectedNovel === index ? 1 : 0.5 }} key={index}>
                            <Image resizeMode="cover" style={{ height: 100, width: 70, borderRadius: 5 }} source={{ uri: coverUrl }} />
                            <Text style={styles.novelTitle}>{title}</Text>
                            <Text style={styles.chapterCount}>{chapters.length}{" "}chapitres</Text>
                        </TouchableOpacity>
                    )
                    } />
            </View>
            {
                novels.length !== 0 && showDescription && (
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Text numberOfLines={3} style={styles.novelDescription}>{novels[selectedNovel].description}</Text>
                        <Button size="sm" containerStyle={{ alignSelf: "flex-end" }} buttonStyle={styles.button}>Voir plus</Button>
                    </View>
                )
            }
        </Container>
    )
}