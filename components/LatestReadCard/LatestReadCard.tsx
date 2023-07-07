import { Card } from "@rneui/base";
import { Image, ImageSourcePropType, StyleSheet, Text, View } from "react-native";
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

    button: {
        backgroundColor: "black",
        borderRadius: 10
    }
});


type LatestReadCardProps = {
    title: string;
    time: string;
    novel: {
        title: string;
        description: string;
        chapterCount: number;
        imgSrc: ImageSourcePropType;
    }
}


export default function LatestReadCard({ title, time, novel }: LatestReadCardProps) {
    return (
        <Card containerStyle={{ margin: 0, borderRadius: 10 }}>
            <View style={styles.header}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.time}>{time}</Text>
            </View>
            <View style={styles.body}>
                <Image resizeMode="cover" style={{ height: 120, width: 80, borderRadius: 10 }} source={novel.imgSrc} />
                <View >
                    <Text style={styles.novelTitle}>{novel.title}</Text>
                    <Text style={styles.chapterCount}>{novel.chapterCount}{" "}chapitres</Text>
                    <Text numberOfLines={5} style={styles.novelDescription}>{novel.description}</Text>
                </View>
            </View>
            <View>
                <Button buttonStyle={styles.button}>Poursuivre</Button>
            </View>
        </Card>
    )
}