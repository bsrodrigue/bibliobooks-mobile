import { useFocusEffect } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { BackHandler, View } from "react-native";
import { SetupAccountInput } from "../../api/auth";
import { AuthForm } from "../../components";
import { RootStackParamList } from "../../types";
import AccountStep from "./steps/AccountStep";
import InformationsStep from "./steps/InformationsStep";
import PreferencesStep from "./steps/PreferencesStep";

type SetupAccountScreenProps = NativeStackScreenProps<RootStackParamList, 'SetupAccount'>;

export default function SetupAccountScreen({ navigation }: SetupAccountScreenProps) {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [formValues, setFormValues] = useState<SetupAccountInput>();

    const next = (values: SetupAccountInput) => {
        setFormValues(values);

        if (currentStepIndex < steps.length - 1) {
            setCurrentStepIndex(currentStepIndex + 1)
            return;
        }
    };

    const previous = () => {
        currentStepIndex !== 0 &&
            setCurrentStepIndex(currentStepIndex - 1)
    };

    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                previous();
                return true;
            };

            const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);

            return () => subscription.remove();
        }, [currentStepIndex])
    );

    const steps = [
        {
            title: "Informations",
            subtitle: "Configurez vos informations personelles",
            component: <InformationsStep formValues={formValues} onNext={next} />
        },
        {
            title: "Compte",
            subtitle: "Configurez votre compte",
            component: <AccountStep formValues={formValues} onNext={next} />
        },
        {
            title: "Préférences",
            subtitle: "Choisissez vos genres favoris",
            component: <PreferencesStep formValues={formValues} navigation={navigation} />
        },
    ]

    return (
        <AuthForm
            title={steps[currentStepIndex].title}
            subtitle={steps[currentStepIndex].subtitle}>
            <View style={{ flex: 1, paddingVertical: 15, justifyContent: "space-between" }}>
                <View style={{ flex: 1 }}>
                    {steps[currentStepIndex].component}
                </View>
            </View>
        </AuthForm>
    )
}