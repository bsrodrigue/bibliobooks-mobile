import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { AuthForm, Button, DateTimePicker, RadioInputGroup, TextInput } from "../../components";
import { config } from "../../config";
import { RootStackParamList } from "../../types";

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

type SetupAccountScreenProps = NativeStackScreenProps<RootStackParamList, 'SetupAccount'>;

export default function SetupAccountScreen({ navigation }: SetupAccountScreenProps) {
    const [birthdate, setBirthdate] = useState(new Date());



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
            <RadioInputGroup label="Votre genre" name="gender" options={config.genderOptions} />
            <DateTimePicker date={birthdate} mode="date" onChange={setBirthdate} />
        </AuthForm>
    )
}