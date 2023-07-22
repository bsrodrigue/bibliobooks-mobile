import { useState } from "react";
import { DateTimePicker, RadioInputGroup, TextInput } from "../../../components";
import { config } from "../../../config";

export default function InformationsStep() {
    const [birthdate, setBirthdate] = useState(new Date());


    return (
        <>
            <TextInput name="firstname" label="Nom de famille" placeholder="Veuillez saisir votre nom de famille" />
            <TextInput name="lastname" label="Prénom" placeholder="Veuillez saisir votre prénom" />
            <RadioInputGroup label="Votre genre" name="gender" options={config.genderOptions} />
            <DateTimePicker date={birthdate} mode="date" onChange={setBirthdate} />
        </>
    )
}