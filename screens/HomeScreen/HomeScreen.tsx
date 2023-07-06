import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, Text, StyleSheet, Image } from "react-native";
import { RootStackParamList } from "../../types";
import { Card } from "@rneui/base";
import { Button } from "../../components";

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
    },

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

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: HomeScreenProps) {

    return (
        <View style={styles.container}>
            <Card containerStyle={{ margin: 0, borderRadius: 10 }}>
                <View style={styles.header}>
                    <Text style={styles.title}>Lecture récente</Text>
                    <Text style={styles.time}>Il y a trois (3) jours</Text>
                </View>
                <View style={styles.body}>
                    <Image resizeMode="cover" style={{ height: 120, width: 80, borderRadius: 10 }} source={require("../../assets/images/dragon.jpg")} />
                    <View >
                        <Text style={styles.novelTitle}>La grande aventure - Tome 1</Text>
                        <Text style={styles.chapterCount}>26 chapitres</Text>
                        <Text numberOfLines={5} style={styles.novelDescription}>Il s’agit d’une histoire vraiment et franchement historique. Rien de plus vrai que l’histoire de l’histoire de vos meilleures histoires historiques. J’avais juste la flemme d’utiliser un lorem ipsum, ironique...</Text>
                    </View>
                </View>
                <View>
                    <Button buttonStyle={styles.button}>Poursuivre</Button>
                </View>
            </Card>
        </View>
    )
}