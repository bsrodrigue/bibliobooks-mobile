import { Formik } from "formik";
import { useState } from "react";
import { View } from "react-native";
import * as Yup from "yup";
import { SetupAccountInput } from "../../../api/auth";
import { Button, DateTimePicker, RadioInputGroup, TextInput } from "../../../components";
import { config } from "../../../config";
import { notify } from "../../../lib";

const informationSchema = Yup.object().shape({
    firstName: Yup.string().required("Champ requis"),
    lastName: Yup.string().required("Champ requis"),
    gender: Yup.string().optional(),
    birthdate: Yup.string().optional(),
});

type InformationsStepProps = {
    onNext?: (values: object) => void;
    formValues: Partial<SetupAccountInput>;
};

export default function InformationsStep({ onNext, formValues }: InformationsStepProps) {
    const [birthdate, setBirthdate] = useState(new Date());

    return (
        <Formik
            validationSchema={informationSchema}
            initialValues={{
                firstName: formValues?.firstName || "",
                lastName: formValues?.lastName || "",
                gender: formValues?.gender || "MALE",
                birthdate: new Date().toISOString(),
            }}
            onSubmit={(values) => {
                const birthdate = new Date(values.birthdate);
                delete values.birthdate;
                onNext?.({ ...values, birthdate })
            }}
        >
            {({ handleChange, handleSubmit, values, errors }) => (
                <View style={{ flex: 1, justifyContent: "space-between" }}>
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
                            onChange={(gender) => handleChange("gender")(gender)}
                        />
                        <DateTimePicker
                            date={birthdate} mode="date" onChange={(value) => {
                                if (value > new Date()) {
                                    notify.error("Nous ne supportons pas les voyageurs temporels :'(")
                                    return;
                                }
                                setBirthdate(value);
                                handleChange("birthdate")(value.toISOString());
                            }} />
                    </View>
                    <Button onPress={handleSubmit} title="Suivant" />
                </View>
            )}
        </Formik>
    )
}