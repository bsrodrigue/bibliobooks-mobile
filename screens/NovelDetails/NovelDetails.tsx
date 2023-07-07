import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Avatar, Card } from "@rneui/base";
import { useTheme } from "@rneui/themed";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button } from "../../components";
import { RootStackParamList } from "../../types";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
    },
});

type NovelDetailsScreenProps = NativeStackScreenProps<RootStackParamList, 'NovelDetails'>;

export default function NovelDetailsScreen({ navigation, route }: NovelDetailsScreenProps) {
    const { novel: { title, description, chapterCount, author, id, genre, mature, imgSrc } } = route.params;
    const { theme: { colors: { black, primary } } } = useTheme();
    const dimension = 165

    return (
        <View style={[styles.container, { backgroundColor: black }]}>
            <View style={{ flex: 0.25, paddingHorizontal: 40 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <View style={{ justifyContent: "space-between" }}>
                        <View>
                            <Text style={{ width: 150, fontSize: 18, color: "white", fontFamily: "Quicksand-700", marginBottom: 10 }}>{title}</Text>
                            <Text style={{ color: "white", fontSize: 16, opacity: 0.5 }}>{author}</Text>
                        </View>
                        <Text style={{ color: "white", fontStyle: "italic" }}>{genre}</Text>

                    </View>
                    <Image style={{ width: 100, height: 150, borderRadius: 10, }} resizeMode="cover" source={imgSrc} />
                </View>
            </View>
            <View style={{ flex: 0.75 }}>

                <Card containerStyle={{ margin: 0, borderTopStartRadius: 10, borderTopEndRadius: 10, flex: 1, paddingHorizontal: 0 }}>

                    <View>
                        <View >
                            <View style={{ paddingHorizontal: 40 }}>
                                <Text style={{ fontSize: 18, fontFamily: "Quicksand-700", marginBottom: 10 }}>Synopsis</Text>
                                <Text style={{ opacity: 0.6, lineHeight: 20, fontFamily: "Quicksand" }}>{description}</Text>
                                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginVertical: 10 }}>
                                    <Text style={{ fontFamily: "Quicksand-700", fontSize: 18 }}>{chapterCount}{" "}chapitres</Text>
                                    <TouchableOpacity>
                                        <Text style={{ opacity: 0.5, fontFamily: "Quicksand-700" }}>Voir tous les chapitres</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={{ backgroundColor: "#D9D9D9", opacity: 0.35, height: 8, marginVertical: 5 }} />

                            <View style={{ paddingHorizontal: 40 }}>
                                <Text style={{ fontSize: 18, fontFamily: "Quicksand-700", marginBottom: 10 }}>L'auteur</Text>
                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                    <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                                        <Avatar
                                            size={50}
                                            rounded
                                            source={imgSrc}
                                        />

                                        <View>
                                            <Text style={{ fontSize: 18, fontFamily: "Quicksand-700" }}>{author}</Text>
                                            <Text style={{ opacity: 0.6, fontFamily: "Quicksand" }}>13 oeuvres</Text>
                                        </View>

                                    </View>
                                    <TouchableOpacity>
                                        <Text style={{ opacity: 0.5, fontFamily: "Quicksand-700" }}>Découvrir</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        <Button containerStyle={{
                            paddingHorizontal: 40,
                            marginVertical: 20
                        }} radius={25} buttonStyle={{ backgroundColor: primary }}>Commencer la lecture</Button>
                    </View>

                </Card>
            </View>
        </View>
    )
}