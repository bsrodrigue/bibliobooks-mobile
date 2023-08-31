import { useTheme } from "@rneui/themed";
import { useRef, useState } from "react";
import { FlatList, ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { config } from "../../config";

type NovelGenreGridProps = {
    onPressItem?: (value: string) => void;
    data?: any[];
    multi?: boolean;
}

export default function NovelGenreGrid({ onPressItem, data, multi }: NovelGenreGridProps) {
    const { theme: { colors: { primary } } } = useTheme();
    const numColumns = useRef(2);
    const [selected, setSelected] = useState("");

    return (
        <FlatList
            numColumns={numColumns.current}
            data={data || config.genreSelectOptions}
            columnWrapperStyle={{ gap: 15 }}
            renderItem={({ item: { value, cover, title, selected: multiSelected } }) => (
                <TouchableOpacity
                    style={{ flex: 1, marginVertical: 10 }}
                    onPress={() => {
                        !multi && setSelected(value);
                        onPressItem?.(value);
                    }
                    }
                >
                    <ImageBackground
                        borderRadius={10}
                        style={{ flex: 1, height: 50, alignItems: "center", justifyContent: "flex-end" }}
                        resizeMode="cover"
                        source={cover}>
                        <View style={{
                            backgroundColor: (multi ? multiSelected : selected === value) ? primary : "black", width: "100%",
                            borderBottomLeftRadius: 10,
                            borderBottomRightRadius: 10
                        }}>
                            <Text style={{ color: "white", textAlign: "center" }}>{title}</Text>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
            )} />
    )
}