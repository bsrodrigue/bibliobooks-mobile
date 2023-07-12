import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Icon } from "@rneui/base";
import { useTheme } from "@rneui/themed";
import { useRef } from "react";
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { novels } from "../../mock";
import { RootStackParamList } from "../../types";

const data = [
    ...novels, { title: "", chapterCount: 0, description: "", imgSrc: "" },
]

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 10,
        justifyContent: "center",
        alignItems: "center",
    },
});

type NoveltyScreenProps = NativeStackScreenProps<RootStackParamList, 'Novelty'>;

export default function NoveltyScreen({ navigation }: NoveltyScreenProps) {
    const columns = useRef(3);
    const screenWidth = Dimensions.get('window').width;
    const { theme: { colors: { greyOutline } } } = useTheme();

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                numColumns={columns.current}
                contentContainerStyle={{
                    marginVertical: 10,
                }}
                columnWrapperStyle={{
                    justifyContent: "flex-start",
                    gap: 15
                }}
                renderItem={({ index, item: { title, imgSrc } }) =>
                (<TouchableOpacity style={{ marginVertical: 1 }} key={index}>
                    {
                        Boolean(title) ? (
                            <>
                                <Image
                                    resizeMode="cover"
                                    source={imgSrc}
                                    style={{
                                        height: 150,
                                        width: (screenWidth - 75) / 3,
                                        borderRadius: 10,
                                    }}

                                />
                                <Text
                                    style={{
                                        width: (screenWidth - 75) / 3,
                                        fontSize: 12,
                                        fontFamily: "Quicksand-700",
                                        marginBottom: 10
                                    }}
                                >{title}</Text>
                            </>
                        ) : (
                            <>
                                <View style={{ flex: 1, backgroundColor: greyOutline, justifyContent: "center", alignItems: "center", borderRadius: 10, opacity: 0.5 }}>
                                    <Icon name="plus" type="font-awesome-5" size={30} />
                                    <Text
                                        style={{
                                            fontSize: 14,
                                            fontFamily: "Quicksand-700",
                                            marginBottom: 10,
                                            textAlign: "center",
                                            width: 75
                                        }}
                                    >Ajouter un livre</Text>
                                </View>
                                <Text style={{ width: (screenWidth - 75) / 3, marginBottom: 20 }} />
                            </>
                        )
                    }
                </TouchableOpacity>)
                } />
        </View>
    )
}