import { Card } from "@rneui/base";
import { Image, StyleSheet, Text, View } from "react-native";
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

    time: {
        fontSize: 10,
        opacity: 0.5,
        fontStyle: "italic",
    },

    body: {
        marginVertical: 10,
        flexDirection: "row",
        gap: 10
    },

    novelTitle: {
        fontFamily: "Quicksand-700",
    },
    chapterCount: {
        fontFamily: "Quicksand-300",
        fontStyle: "italic",
        opacity: 0.5,
        marginVertical: 5
    },
    novelDescription: {
        maxWidth: 200,
        fontFamily: "Quicksand-600",
        fontSize: 12
    },

});

type LatestReadCardProps = {
    title: string;
    time: string;
    novel: ReaderNovel;
    onResume?: (novel: ReaderNovel) => void;
}

export default function LatestReadCard({ title, time, novel, onResume }: LatestReadCardProps) {
    const { title: novelTitle, description, chapters, coverUrl } = novel;
    return (
        <Card containerStyle={{ margin: 0, borderRadius: 10 }}>
            <View style={styles.header}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.time}>{time}</Text>
            </View>
            <View style={styles.body}>
                <Image resizeMode="cover" style={{ height: 120, width: 80, borderRadius: 10 }} source={{ uri: coverUrl }} />
                <View >
                    <Text style={styles.novelTitle}>{novelTitle}</Text>
                    <Text style={styles.chapterCount}>{chapters.length}{" "}chapitres</Text>
                    <Text numberOfLines={5} style={styles.novelDescription}>{description}</Text>
                </View>
            </View>
            <View>
                <Button size="sm" titleStyle={{ fontFamily: "Quicksand-700" }} onPress={() => onResume?.(novel)} >Poursuivre</Button>
            </View>
        </Card>
    )
}