import { useTheme } from "@rneui/themed";
import { StyleSheet } from "react-native";

export function useOnboardingStyles() {
    const { theme: { colors: { primary } } } = useTheme();

    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: "white",
            paddingVertical: 20,
        },

        header: {
            flex: 0.2,
            alignItems: "center"
        },

        title: {
            fontSize: 30,
            fontFamily: "Quicksand-700",
            color: primary
        },

        body: {
            flex: 0.6,
        },

        footer: {
            flex: 0.2,
            justifyContent: "flex-end",
            gap: 15,
            paddingHorizontal: 40,
        },

        next: {
            fontFamily: "Quicksand-700"
        },

        skip: {
            color: "black",
            fontFamily: "Quicksand-600",
        }
    });


}

