import { Form } from "@n7studio/react-original-form-native";
import { useFocusEffect } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useRef, useState } from "react";
import { BackHandler, StyleSheet } from "react-native";
import { AuthForm, Button } from "../../components";
import { RootStackParamList } from "../../types";
import AccountStep from "./steps/AccountStep";
import InformationsStep from "./steps/InformationsStep";
import PreferencesStep from "./steps/PreferencesStep";

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

const steps = [
    {
        title: "Informations",
        subtitle: "Configurez vos informations personelles",
        component: <InformationsStep />
    },
    {
        title: "Compte",
        subtitle: "Configurez votre compte",
        component: <AccountStep />
    },
    {
        title: "Préférences",
        subtitle: "Choisissez vos genres favoris",
        component: <PreferencesStep />
    },
]

export default function SetupAccountScreen({ navigation }: SetupAccountScreenProps) {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const formRef = useRef(null);

    const next = () => {
        if (currentStepIndex < steps.length - 1) {
            setCurrentStepIndex(currentStepIndex + 1)
            return;
        }

        navigation.navigate("Success", {
            title: "Parfait",
            subtitle: "Votre compte est finalement prêt. Vous pouvez commencer à explorer la plateforme",
            confirm: "Poursuivre",
            destination: "Home"
        })
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

    return (
        <AuthForm
            title={steps[currentStepIndex].title}
            subtitle={steps[currentStepIndex].subtitle}
            footer={<>
                <Button
                    onPress={() => {
                        formRef.current.submit();
                    }}
                    title={"Suivant"}
                    titleStyle={styles.next}
                    color="black"
                    size="lg"
                    radius={5}
                />
            </>}>
            <Form onSubmit={(values) => {
                next();
            }} ref={formRef}>
                {steps[currentStepIndex].component}
            </Form>
        </AuthForm>
    )
}