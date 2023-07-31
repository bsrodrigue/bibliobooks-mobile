import { Card } from "@rneui/base";
import { FlatList, Image, RefreshControl, Text, TouchableOpacity, View } from "react-native";
import { ReaderNovel } from "../../types/models";

type NovelListProps = {
    novels: Array<ReaderNovel>;
    onPressItem: (item: ReaderNovel) => void;
    refreshing?: boolean;
    onRefresh?: () => void;
};

export default function NovelList({ novels, onPressItem, refreshing, onRefresh }: NovelListProps) {

    return (
        <FlatList
            data={novels}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
                flex: 1
            }}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            renderItem={({ index, item }) =>
            (
                <Card containerStyle={{ marginHorizontal: 0, borderRadius: 10 }}>
                    <TouchableOpacity key={index} onPress={() => onPressItem(item)}>
                        <View style={{ flexDirection: "row", gap: 10 }}>
                            <Image resizeMode="cover" style={{ width: 70, height: 100, borderRadius: 5 }} source={{ uri: item?.coverUrl }} />
                            <View>
                                <Text numberOfLines={1} style={{ fontFamily: "Quicksand-700" }}>{item.title}</Text>
                                <Text style={{ fontFamily: "Quicksand-300", opacity: 0.5, fontStyle: "italic" }}>{item.chapters.length}{" "}chapitres</Text>
                                <Text numberOfLines={4} style={{ width: 200, textAlign: "justify", fontSize: 12 }}>{item.description}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </Card>
            )
            } />
    )
}