import { useRef } from "react";
import { Dimensions, FlatList, TouchableOpacity } from "react-native";
import { Novel } from "../../types/models";
import { AddNovel } from "../AddNovel";
import { BasicNovel } from "../BasicNovel";

type NovelGridProps = {
    novels: Novel[] | { last: boolean }[];
    onNovelPress?: (novel: Novel) => void;
    onNovelLongPress?: (novel: Novel) => void;
    onLastItemPress?: () => void;
}

export default function NovelGrid({ novels, onNovelPress, onNovelLongPress, onLastItemPress }: NovelGridProps) {
    const screenWidth = Dimensions.get('window').width;
    const columns = useRef(3);

    return (
        <FlatList
            data={[...novels, { last: true }]}
            numColumns={columns.current}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => (
                <TouchableOpacity onPress={() => {
                    onLastItemPress?.()
                }}>
                    <AddNovel label="Ajouter un livre" />
                </TouchableOpacity>
            )}
            contentContainerStyle={{
                marginVertical: 10,
            }}
            columnWrapperStyle={{
                justifyContent: "flex-start",
                gap: 15
            }}
            renderItem={({ index, item }) =>
            (<TouchableOpacity
                onPress={() => {
                    item?.last ? onLastItemPress?.() : onNovelPress?.(item)
                }}
                onLongPress={() => { !item?.last && onNovelLongPress?.(item) }}
                key={index}>

                {item?.last ? (<AddNovel label="Ajouter un livre" />) : (
                    <BasicNovel
                        novel={item}
                        imageStyle={{
                            height: 150,
                            width: (screenWidth - 75) / 3,
                            borderRadius: 10,
                        }}
                        labelStyle={{
                            width: (screenWidth - 75) / 3,
                            fontSize: 12,
                            fontFamily: "Quicksand-700",
                            marginBottom: 10
                        }}
                    />

                )}
            </TouchableOpacity>)
            } />
    );
}