import { Formik } from "formik";
import { useState } from "react";
import { View } from "react-native";
import * as Yup from "yup";
import { Button, DateTimePicker, RadioInputGroup, TextInput } from "../../../components";
import { config } from "../../../config";
import { notify } from "../../../lib";

const informationSchema = Yup.object().shape({
    firstName: Yup.string().required("Champ requis"),
    lastName: Yup.string().required("Champ requis"),
    gender: Yup.string().required("Champ requis"),
    birthdate: Yup.date().required("Champ requis"),
});

type InformationsStepProps = {
    formValues?: object;
    onNext?: (values: object) => void;
};

export default function InformationsStep({ formValues, onNext }: InformationsStepProps) {
    const [birthdate, setBirthdate] = useState(new Date());

    return (
        <Formik
            validationSchema={informationSchema}
            initialValues={{
                firstName: "",
                lastName: "",
                gender: "male",
                birthdate: new Date(),
            }}
            onSubmit={(values) => {
                onNext?.({ ...formValues, ...values, birthdate: values.birthdate.toISOString() })
            }}
        >
            {({ handleChange, handleSubmit, values, errors }) => (
                <View style={{ flex: 1, justifyContent: "space-between", paddingTop: 15 }}>
                    <View>
                        <TextInput
                            errorMessage={errors.firstName}
                            value={values.firstName}
                            onChangeText={handleChange("firstName")}
                            label="Nom de famille" placeholder="Veuillez saisir votre nom de famille" />
                        <TextInput
                            errorMessage={errors.lastName}
                            value={values.lastName}
                            onChangeText={handleChange("lastName")}
                            label="Prénom" placeholder="Veuillez saisir votre prénom" />
                        <RadioInputGroup
                            errorMessage={errors.gender}
                            value={values.gender}
                            label="Votre genre"
                            name="gender"
                            options={config.genderOptions}
                            onChange={(_) => handleChange("gender")}
                        />
                        <DateTimePicker
                            date={birthdate} mode="date" onChange={(value) => {
                                if (value > new Date()) {
                                    notify.error("Nous ne supportons pas les voyageurs temporels :'(")
                                    return;
                                }
                                setBirthdate(value);
                                return handleChange("birthdate");
                            }} />
                    </View>
                    <Button onPress={() => handleSubmit()} title="Suivant" />
                </View>
            )}
        </Formik>
    )
}