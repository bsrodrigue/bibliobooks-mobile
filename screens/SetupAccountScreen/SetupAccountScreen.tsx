import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { AuthForm, Button, TextInput } from "../../components";
import { RootStackParamList } from "../../types";
import { CheckBox } from "@rneui/base";
import { useTheme } from "@rneui/themed";
import { useEffect, useState } from "react";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

const styles = StyleSheet.create({
    next: {
        fontSize: 20,
        fontFamily: "Quicksand-700"
    },

    register: {
        textAlign: "center",
        textDecorationLine: "underline",
    }
});

type RadioInputProps = {
    label: string;
    imgSrc: ImageSourcePropType;
    value: string;
    selected: string;
    onPress: (value: string) => void;
}

function RadioInput({ label, imgSrc, value, selected, onPress }: RadioInputProps) {
    const { theme: { colors: { primary, greyOutline } } } = useTheme();
    const checked = value === selected;

    return (
        <TouchableOpacity
            onPress={() => {
                onPress(value);
            }}
            style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                borderRadius: 10,
                borderColor: checked ? primary : greyOutline,
                borderWidth: 1,
                paddingHorizontal: 10,
                paddingVertical: 5,
            }}>
            <Image style={{ height: 45, width: 45 }} source={imgSrc} />

            <View style={{ alignItems: "flex-end" }}>
                <CheckBox
                    containerStyle={{ padding: 0 }}
                    checked={checked}
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    checkedColor={primary}
                />
                <Text style={{
                    fontFamily: "Quicksand-600",
                }}>{label}</Text>
            </View>
        </TouchableOpacity>
    )
}

type RadioInputGroupProps = {
    label: string;
    name: string;
    onChange?: (value: string) => void;
}

function RadioInputGroup({ label, name, onChange }: RadioInputGroupProps) {
    const [selected, setSelected] = useState("");

    useEffect(() => {
        onChange?.(selected);
    }, [selected]);

    return (
        <>
            <Text style={{ fontFamily: "Quicksand-700" }}>{label}</Text>
            <View style={{ flexDirection: "row", gap: 15, marginVertical: 5 }}>
                <RadioInput
                    label="Homme"
                    value="male"
                    selected={selected}
                    onPress={setSelected}
                    imgSrc={require("../../assets/illustrations/male.png")} />
                <RadioInput
                    label="Femme"
                    value="female"
                    selected={selected}
                    onPress={setSelected}
                    imgSrc={require("../../assets/illustrations/female.png")} />
            </View>
        </>
    )
}

type SetupAccountScreenProps = NativeStackScreenProps<RootStackParamList, 'SetupAccount'>;

export default function SetupAccountScreen({ navigation }: SetupAccountScreenProps) {
    const [birthdate, setBirthdate] = useState(new Date());

    const onOpenDatePicker = () => {
        DateTimePickerAndroid.open({
            mode: "date",
            value: birthdate, onChange: (_e, date) => {
                setBirthdate(date);
            }
        });
    }


    return (
        <AuthForm
            title="Informations"
            subtitle="Configurez vos informations personelles"
            footer={<>
                <Button
                    title={"Suivant"}
                    titleStyle={styles.next}
                    color="black"
                    size="lg"
                    radius={5}
                />
            </>}>
            <TextInput label="Nom de famille" placeholder="Veuillez saisir votre nom de famille" />
            <TextInput label="Prénom" placeholder="Veuillez saisir votre prénom" />
            <RadioInputGroup label="Votre genre" name="gender" />

            <TouchableOpacity
                onPress={onOpenDatePicker}
                style={{ marginVertical: 10 }}>
                <TextInput
                    label="Date de naissance"
                    disabled
                    placeholder="Veuillez choisir votre date de naissance"
                    errorMessage={birthdate > new Date() ? "Vous ne pouvez pas venir du futur" : ""}
                    value={birthdate.toDateString()}
                />
            </TouchableOpacity>

        </AuthForm>
    )
}