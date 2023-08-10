import { Formik } from "formik";
import { useState } from "react";
import { View } from "react-native";
import * as Yup from "yup";
import { Button, DateTimePicker, RadioInputGroup, TextInput } from "../../../components";
import { config } from "../../../config";
import { notify } from "../../../lib";
import { SetupAccountInput } from "../../../api/auth";

const informationSchema = Yup.object().shape({
    firstName: Yup.string().required("Champ requis"),
    lastName: Yup.string().required("Champ requis"),
    gender: Yup.string().optional(),
    birthdate: Yup.date().optional(),
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
                birthdate: new Date(),
            }}
            onSubmit={(values) => {
                onNext?.({ ...values, birthdate: values.birthdate.toISOString() })
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
                            onChange={(gender) => handleChange("gender")(gender)}
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