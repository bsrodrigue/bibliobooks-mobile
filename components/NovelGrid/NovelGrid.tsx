import { useRef } from "react";
import { Dimensions, FlatList, TouchableOpacity } from "react-native";
import { Novel } from "../../types";
import { AddNovel } from "../AddNovel";
import { BasicNovel } from "../BasicNovel";

type NovelGridProps = {
    novels: Novel[];
    onNovelPress?: (novel: Novel) => void;
    onNovelLongPress?: (novel: Novel) => void;
    onLastItemPress?: () => void;
}

export default function NovelGrid({ novels, onNovelPress, onNovelLongPress, onLastItemPress }: NovelGridProps) {
    const screenWidth = Dimensions.get('window').width;
    const columns = useRef(3);

    return (
        <FlatList
            data={novels}
            numColumns={columns.current}
            showsVerticalScrollIndicator={false}
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
                    item.last ? onLastItemPress?.() : onNovelPress?.(item)
                }}
                onLongPress={() => onNovelLongPress?.(item)}
                style={{ marginVertical: 1 }}
                key={index}>
                {
                    !item.last ? (
                        <BasicNovel
                            novel={item}
                            imageStyle={
                                {
                                    height: 150,
                                    width: (screenWidth - 75) / 3,
                                    borderRadius: 10,
                                }
                            }
                            labelStyle={
                                {
                                    width: (screenWidth - 75) / 3,
                                    fontSize: 12,
                                    fontFamily: "Quicksand-700",
                                    marginBottom: 10
                                }
                            }
                        />
                    ) : (<AddNovel label="Ajouter un livre" />)
                }
            </TouchableOpacity>)
            } />
    );
}