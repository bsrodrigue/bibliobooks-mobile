import { Icon } from "@rneui/base";
import { useTheme } from "@rneui/themed";
import { useRef } from "react";
import { Dimensions, FlatList, Image, ImageStyle, StyleProp, Text, TextStyle, TouchableOpacity, View } from "react-native";
import { Novel } from "../../types";

type NovelGridProps = {
    novels: Novel[];
    onNovelPress: (novel: Novel) => void;
    onNovelLongPress: (novel: Novel) => void;
    onLastItemPress: () => void;
}

type LastItemNovelProps = {
    label: string;
}

function LastItemNovel({ label }: LastItemNovelProps) {
    const screenWidth = Dimensions.get('window').width;
    const { theme: { colors: { greyOutline } } } = useTheme();

    return (
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
                >{label}</Text>
            </View>
            <Text style={{ width: (screenWidth - 75) / 3, marginBottom: 20 }} />
        </>
    )
}

type BasicNovelProps = {
    novel: Novel;
    imageStyle?: StyleProp<ImageStyle>;
    labelStyle?: StyleProp<TextStyle>
};

function BasicNovel({ novel: { title, imgSrc }, imageStyle, labelStyle }: BasicNovelProps) {
    return (
        <>
            <Image
                resizeMode="cover"
                source={imgSrc}
                style={imageStyle}
            />
            <Text style={labelStyle}
            >{title}</Text>
        </>
    )
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
                    item.last ? onLastItemPress() : onNovelPress(item)
                }}
                onLongPress={() => onNovelLongPress(item)}
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
                    ) : (<LastItemNovel label="Ajouter un livre" />)
                }
            </TouchableOpacity>)
            } />
    );
}