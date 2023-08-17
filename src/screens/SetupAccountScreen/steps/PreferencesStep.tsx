import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useTheme } from "@rneui/themed";
import { Formik } from "formik";
import { useState } from "react";
import { SetupAccountInput, setupAccount } from "../../../api/auth";
import useCall from "../../../api/useCall";
import { Button, NovelGenreGrid } from "../../../components";
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
                    <NovelGenreGrid multi data={genres} onPressItem={toggle} />
                    <Button loading={isLoading} onPress={() => handleSubmit()} title="Terminer" />
                </>
            )}
        </Formik>
    )
}