import { Card } from "@rneui/base";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { Novel } from "../../types";

type NovelListProps = {
    novels: Novel[];
    onPressItem: (item: Novel) => void;
};

export default function NovelList({ novels, onPressItem }: NovelListProps) {

    return (
        <FlatList
            data={novels}
            showsVerticalScrollIndicator={false}
            renderItem={({ index, item: { title, chapterCount, description, imgSrc } }) =>
            (
                <Card containerStyle={{ marginHorizontal: 0, borderRadius: 10 }}>
                    <TouchableOpacity key={index} onPress={() => onPressItem({ title, chapterCount, description, imgSrc })}>
                        <View style={{ flexDirection: "row", gap: 10 }}>
                            <Image resizeMode="cover" style={{ width: 70, height: 100, borderRadius: 5 }} source={imgSrc} />

                            <View>
                                <Text style={{ fontFamily: "Quicksand-700" }}>{title}</Text>
                                <Text style={{ fontFamily: "Quicksand-300", opacity: 0.5, fontStyle: "italic" }}>{chapterCount}{" "}chapitres</Text>
                                <Text numberOfLines={4} style={{ width: 200, textAlign: "justify" }}>{description}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </Card>
            )
            } />
    )
}