import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useTheme } from "@rneui/themed";
import { Formik } from "formik";
import { useRef, useState } from "react";
import { FlatList, ImageBackground, Text, TouchableOpacity, View } from "react-native";
import * as Yup from "yup";
import { SetupAccountInput, setupAccount } from "../../../api/auth";
import useCall from "../../../api/useCall";
import { Button } from "../../../components";
import { config } from "../../../config";
import { RootStackParamList, UIGenre } from "../../../types";

const preferencesSchema = Yup.object().shape({
    favouriteGenres: Yup.string().optional(),
});

type PreferencesStepProps = {
    navigation?: NativeStackNavigationProp<RootStackParamList, "SetupAccount", undefined>;
    formValues: SetupAccountInput;
};

export default function PreferencesStep({ formValues, navigation }: PreferencesStepProps) {
    const { theme: { colors: { primary } } } = useTheme();
    const { call, isLoading } = useCall(setupAccount, {
        onSuccess(result) {
            console.log(result);
            navigation.replace("SetupAccountSuccess", { userProfile: result });
        },
    });
    const numColumns = useRef(2);
    const [genres, setGenres] = useState<Array<UIGenre & { selected: boolean }>>(config.genres.map(genre => ({
        selected: false, ...genre,
    })))

    const toggle = (value: string) => {
        const result = genres.map((genre) => {
            if (genre.value === value) {
                genre.selected = !genre.selected;
            }

            return genre;
        });
        setGenres(result);
        return result;
    }

    return (
        <Formik
            validationSchema={preferencesSchema}
            initialValues={{
                favouriteGenres: "",
            }}
            onSubmit={async (values) => {
                const genres = values.favouriteGenres ? JSON.parse(values.favouriteGenres).map((fav) => fav.value) : [];
                await call({ ...formValues, favouriteGenres: genres });
            }}
        >
            {({ handleChange, handleSubmit }) => (
                <>
                    <View>
                        <Text style={{ fontFamily: "Quicksand-700", fontSize: 20 }}>Quels genres d’histoires aimez-vous?</Text>
                        <Text style={{ fontFamily: "Quicksand-600", opacity: 0.5 }}>Vous pourrez toujours changer ça plus tard</Text>
                    </View>
                    <FlatList
                        numColumns={numColumns.current}
                        data={genres}
                        columnWrapperStyle={{ gap: 15 }}
                        renderItem={({ item: { value, cover, selected, title } }) => (
                            <TouchableOpacity
                                style={{ flex: 1, marginVertical: 10 }}
                                onPress={() => {
                                    const result = toggle(value);
                                    handleChange("favouriteGenres")(JSON.stringify(result));
                                }
                                }
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
                    <Button loading={isLoading} onPress={() => handleSubmit()} title="Terminer" />
                </>
            )}
        </Formik>
    )
}