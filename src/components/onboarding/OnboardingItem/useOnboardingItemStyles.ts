import { StyleSheet } from "react-native";

export function useOnboardingItemStyles() {
    return StyleSheet.create({
        container: {
            flex: 1,
            paddingHorizontal: 40,
        },

        image: {
            flex: 0.5,
            marginBottom: 10,
        },

        title: {
            textAlign: "center",
            fontSize: 40,
            fontFamily: "Quicksand-700",
            marginVertical: 10
        },

        description: {
            opacity: 0.5,
            fontSize: 16,
            textAlign: "center",
            fontFamily: "Quicksand-600"
        },
    });
}