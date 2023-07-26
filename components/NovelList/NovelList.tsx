import { Card } from "@rneui/base";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { Novel } from "../../types/models";

type NovelListProps = {
    novels: Novel[];
    onPressItem: (item: Novel) => void;
};

export default function NovelList({ novels, onPressItem }: NovelListProps) {

    return (
        <FlatList
            data={novels}
            showsVerticalScrollIndicator={false}
            renderItem={({ index, item }) =>
            (
                <Card containerStyle={{ marginHorizontal: 0, borderRadius: 10 }}>
                    <TouchableOpacity key={index} onPress={() => onPressItem(item)}>
                        <View style={{ flexDirection: "row", gap: 10 }}>
                            <Image resizeMode="cover" style={{ width: 70, height: 100, borderRadius: 5 }} source={{ uri: item?.coverUrl }} />

                            <View>
                                <Text style={{ fontFamily: "Quicksand-700" }}>{item.title}</Text>
                                <Text style={{ fontFamily: "Quicksand-300", opacity: 0.5, fontStyle: "italic" }}>{"0"}{" "}chapitres</Text>
                                <Text numberOfLines={4} style={{ width: 200, textAlign: "justify" }}>{item.description}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </Card>
            )
            } />
    )
}