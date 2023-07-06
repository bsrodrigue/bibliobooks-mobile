import { FormPartial } from "@n7studio/react-original-form-native";
import { useTheme } from "@rneui/themed";
import { useRef, useState } from "react";
import { FlatList, ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { config } from "../../../config";

export default function PreferencesStep() {
    const { theme: { colors: { primary } } } = useTheme();
    const numColumns = useRef(2);
    const [genres, setGenres] = useState(config.genres.map(genre => ({
        selected: false, ...genre,
    })))


    const toggle = (value: string) => {
        setGenres((genres) => genres.map((genre) => {
            if (genre.value === value) {
                genre.selected = !genre.selected;
            }

            return genre;
        }
        ));
    }



    console.log(genres);

    return (
        <FormPartial>
            <View style={{ marginBottom: 20 }}>
                <Text style={{ fontFamily: "Quicksand-700", fontSize: 20 }}>Quels genres d’histoires aimez-vous?</Text>
                <Text style={{ fontFamily: "Quicksand-600", opacity: 0.5 }}>Vous pourrez toujours changer ça plus tard</Text>
            </View>
            <FlatList
                numColumns={numColumns.current}
                data={genres}
                columnWrapperStyle={{ gap: 15 }}
                renderItem={({ item: { title, cover, value, selected } }) => (
                    <TouchableOpacity
                        style={{ flex: 1, marginVertical: 10 }}
                        onPress={() => toggle(value)}
                    >
                        <ImageBackground
                            borderRadius={10}
                            style={{ flex: 1, height: 80, alignItems: "center", justifyContent: "flex-end" }}
                            resizeMode="cover"
                            source={cover}>
                            <View style={{
                                backgroundColor: selected ? primary : "black", width: "100%",
                                borderBottomLeftRadius: 10,
                                borderBottomRightRadius: 10
                            }}>
                                <Text style={{ color: "white", textAlign: "center" }}>{title}</Text>
                            </View>
                        </ImageBackground>
                    </TouchableOpacity>
                )} />
        </FormPartial>
    )
}