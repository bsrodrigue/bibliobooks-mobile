import { useFocusEffect } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useTheme } from "@rneui/themed";
import React, { useRef, useState } from "react";
import { BackHandler, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import PagerView from "react-native-pager-view";
import { SetupAccountInput } from "../../api/auth";
import { AuthForm } from "../../components";
import { RootStackParamList } from "../../types";
import AccountStep from "./steps/AccountStep";
import InformationsStep from "./steps/InformationsStep";
import PreferencesStep from "./steps/PreferencesStep";

type SetupAccountScreenProps = NativeStackScreenProps<RootStackParamList, 'SetupAccount'>;

export default function SetupAccountScreen({ navigation }: SetupAccountScreenProps) {
    const { theme: { colors: { primary, grey5 } } } = useTheme();
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [formValues, setFormValues] = useState<SetupAccountInput>();
    const _pagerRef = useRef(null);

    const updateFormValues = (values: Partial<SetupAccountInput>) => {
        setFormValues((prev) => ({ ...prev, ...values }));
    }

    const next = (values: Partial<SetupAccountInput>) => {
        if (currentStepIndex < steps.length - 1) {
            _pagerRef.current.setPage(currentStepIndex + 1);
        }
        updateFormValues(values);
    };

    const previous = () => {
        if (currentStepIndex !== 0) {
            _pagerRef.current.setPage(currentStepIndex - 1);
        }
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
        <View style={{ flex: 1 }}>
            <AuthForm
                title={steps[currentStepIndex].title}
                subtitle={steps[currentStepIndex].subtitle}>
                <View style={{ flexDirection: "row", justifyContent: "center", gap: 15 }}>
                    {[1, 2, 3].map((number) => (
                        <View key={number}
                            style={{
                                backgroundColor: number <= currentStepIndex + 1 ? primary : grey5, width: 30,
                                borderRadius: 25, justifyContent: "center", alignItems: "center", height: 10
                            }} />
                    ))
                    }
                </View>
                <PagerView
                    ref={_pagerRef}
                    scrollEnabled={false}
                    onPageSelected={(e) => {
                        setCurrentStepIndex(e.nativeEvent.position);
                    }} initialPage={0} style={{ flex: 1 }}>
                    <KeyboardAwareScrollView contentContainerStyle={{ flex: 1, paddingVertical: 15 }}>
                        <InformationsStep formValues={formValues} onNext={next} />
                    </KeyboardAwareScrollView>

                    <KeyboardAwareScrollView contentContainerStyle={{ flex: 1, paddingVertical: 15 }}>
                        <AccountStep formValues={formValues} onNext={next} />
                    </KeyboardAwareScrollView>

                    <KeyboardAwareScrollView contentContainerStyle={{ flex: 1, paddingVertical: 15 }}>
                        <PreferencesStep formValues={formValues} navigation={navigation} />
                    </KeyboardAwareScrollView>
                </PagerView>
            </AuthForm>
        </View>
    )
}