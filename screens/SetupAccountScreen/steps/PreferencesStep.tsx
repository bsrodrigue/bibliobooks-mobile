import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useTheme } from "@rneui/themed";
import { Formik } from "formik";
import { useRef, useState } from "react";
import { FlatList, ImageBackground, Text, TouchableOpacity, View } from "react-native";
import * as Yup from "yup";
import { setupAccount } from "../../../api/auth";
import useCall from "../../../api/useCall";
import { Button } from "../../../components";
import { config } from "../../../config";
import { useSession } from "../../../providers";
import { RootStackParamList } from "../../../types";

const preferencesSchema = Yup.object().shape({
    favouriteGenres: Yup.string().required("Champ requis"),
});

type PreferencesStepProps = {
    formValues?: any;
    navigation?: NativeStackNavigationProp<RootStackParamList, "SetupAccount", undefined>;
};

export default function PreferencesStep({ formValues, navigation }: PreferencesStepProps) {
    const { theme: { colors: { primary } } } = useTheme();
    const { session: { userProfile: { userId } } } = useSession();
    const { call, isLoading } = useCall(setupAccount);
    const numColumns = useRef(2);
    const [genres, setGenres] = useState(config.genres.map(genre => ({
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
                const favs = JSON.parse(values.favouriteGenres);
                const genres = favs.map((fav) => fav.value);
                values.favouriteGenres = genres;
                const result = await call({ ...values, ...formValues, userId });
                result && navigation.replace("SetupAccountSuccess", { userProfile: result });
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
                        renderItem={({ item: { title, cover, value, selected } }) => (
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