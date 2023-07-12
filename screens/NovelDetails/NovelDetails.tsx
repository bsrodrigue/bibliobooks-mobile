import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Avatar, BottomSheet, Card, Divider, Icon } from "@rneui/base";
import { useTheme } from "@rneui/themed";
import { useState } from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "../../components";
import { RootStackParamList } from "../../types";

const chapters = [
    { id: "1", title: "Chapter: The great adventure of the great boss" },
    { id: "2", title: "Chapter: The great adventure of the great boss" },
    { id: "3", title: "Chapter: The great adventure of the great boss" },
    { id: "4", title: "Chapter: The great adventure of the great boss" },
    { id: "5", title: "Chapter: The great adventure of the great boss" },
    { id: "6", title: "Chapter: The great adventure of the great boss" },
    { id: "7", title: "Chapter: The great adventure of the great boss" },
    { id: "8", title: "Chapter: The great adventure of the great boss" },
    { id: "9", title: "Chapter: The great adventure of the great boss" },
];

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
    const [chapterListIsVisible, setChapterListIsVisible] = useState(false);
    const dimension = 165

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: black }]}>
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
                                <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: 10 }}>
                                    <View style={{ width: 50, }}>
                                        <Icon name="eye" solid type="font-awesome-5" size={20} containerStyle={{ alignSelf: "flex-start" }} />
                                        <Text style={{ alignSelf: "flex-end", fontFamily: "Quicksand-700", fontSize: 16 }}>19.9K</Text>
                                    </View>
                                    <View style={{ width: 50, }}>
                                        <Icon name="star" solid type="font-awesome-5" size={20} containerStyle={{ alignSelf: "flex-start" }} />
                                        <Text style={{ alignSelf: "flex-end", fontFamily: "Quicksand-700", fontSize: 16 }}>19.9K</Text>
                                    </View>
                                    <View style={{ width: 50, }}>
                                        <Icon name="comments" solid type="font-awesome-5" size={20} containerStyle={{ alignSelf: "flex-start" }} />
                                        <Text style={{ alignSelf: "flex-end", fontFamily: "Quicksand-700", fontSize: 16 }}>19.9K</Text>
                                    </View>
                                </View>
                                <Divider style={{ marginVertical: 15, opacity: 0.5 }} />
                                <Text style={{ fontSize: 18, fontFamily: "Quicksand-700", marginBottom: 10 }}>Synopsis</Text>
                                <Text style={{ opacity: 0.6, lineHeight: 16, fontFamily: "Quicksand" }}>{description}</Text>
                                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginVertical: 10 }}>
                                    <Text style={{ fontFamily: "Quicksand-700", fontSize: 18 }}>{chapterCount}{" "}chapitres</Text>
                                    <TouchableOpacity onPress={() => setChapterListIsVisible(true)} >
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

                        <View style={{ paddingHorizontal: 40 }}>

                            <Divider style={{ marginVertical: 15, opacity: 0.5 }} />
                            <Button
                                onPress={() => { setChapterListIsVisible(true) }}
                                containerStyle={{
                                    marginVertical: 20
                                }} radius={25} buttonStyle={{ backgroundColor: primary }}>Commencer la lecture</Button>
                        </View>
                    </View>

                </Card>
            </View>
            <BottomSheet onBackdropPress={() => setChapterListIsVisible(false)} isVisible={chapterListIsVisible}>
                <Card containerStyle={{ margin: 0, borderTopStartRadius: 10, borderTopEndRadius: 10, flex: 1, paddingHorizontal: 40, }}>
                    <FlatList
                        ListHeaderComponent={<Text style={{ fontFamily: "Quicksand-700", fontSize: 18, marginVertical: 15 }}>{chapterCount}{" "}chapitres</Text>}
                        showsVerticalScrollIndicator={false} style={{ height: 300 }} data={chapters} renderItem={({ index, item: { id, title } }) => (
                            <TouchableOpacity key={id} style={{ paddingVertical: 12 }}>
                                <Text style={{ fontFamily: "Quicksand-600" }}>{title}</Text>
                            </TouchableOpacity>)}
                    />
                </Card>
            </BottomSheet>
        </SafeAreaView>
    )
}