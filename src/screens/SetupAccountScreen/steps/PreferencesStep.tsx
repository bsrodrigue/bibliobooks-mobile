import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useTheme } from "@rneui/themed";
import { Formik } from "formik";
import { useRef, useState } from "react";
import { FlatList, ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { SetupAccountInput, setupAccount } from "../../../api/auth";
import useCall from "../../../api/useCall";
import { Button } from "../../../components";
import { config } from "../../../config";
import { RootStackParamList } from "../../../types";

type PreferencesStepProps = {
    navigation?: NativeStackNavigationProp<RootStackParamList, "SetupAccount", undefined>;
    formValues: SetupAccountInput;
};

export default function PreferencesStep({ formValues, navigation }: PreferencesStepProps) {
    const { theme: { colors: { primary } } } = useTheme();
    const { call, isLoading } = useCall(setupAccount, {
        onSuccess(result) {
            navigation.replace("SetupAccountSuccess", { userProfile: result });
        },
    });
    const numColumns = useRef(2);
    const [genres, setGenres] = useState(config.genreSelectOptions);
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
            initialValues={{
                favouriteGenres: [],
            }}
            onSubmit={async () => {
                const favouriteGenres = genres.filter((genre) => genre.selected).map((genre) => genre.value);
                await call({ ...formValues, favouriteGenres });
            }}
        >
            {({ handleSubmit }) => (
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
                                    toggle(value);
                                }
                                }
                            >
                                <ImageBackground
                                    borderRadius={10}
                                    style={{ flex: 1, height: 60, alignItems: "center", justifyContent: "flex-end" }}
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