import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Card } from "@rneui/base";
import { useTheme } from "@rneui/themed";
import { useState } from "react";
import { FlatList, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { NovelList } from "../../components";
import { config } from "../../config";
import { novels } from "../../mock";
import { RootStackParamList } from "../../types";

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
    const [selected, setSelected] = useState("action");

    return (
        <>
            <Card containerStyle={{ margin: 0, padding: 0 }}>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    data={config.genres}
                    contentContainerStyle={{ gap: 10 }}
                    renderItem={({ index, item: { title, cover, value } }) => (
                        <TouchableOpacity
                            onPress={() => setSelected(value)}
                            style={{ marginVertical: 10 }}
                            key={index}>
                            <ImageBackground
                                borderRadius={10}
                                style={{ height: 60, width: 140, alignItems: "center", justifyContent: "flex-end" }}
                                resizeMode="cover"
                                source={cover}>
                                <View style={{
                                    backgroundColor: selected === value ? primary : "black", width: "100%",
                                    borderBottomLeftRadius: 10,
                                    borderBottomRightRadius: 10
                                }}>
                                    <Text style={{ color: "white", textAlign: "center" }}>{title}</Text>
                                </View>
                            </ImageBackground>
                        </TouchableOpacity>)} />
            </Card>
            <View style={styles.container}>
                <NovelList novels={novels} onPressItem={() => { }} />
            </View>
        </>
    )
}