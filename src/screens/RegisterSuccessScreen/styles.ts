import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        justifyContent: "space-around",
        alignItems: "center",
        paddingHorizontal: 40,
        paddingVertical: 15,
        paddingTop: 100,
    },

    title: {
        fontSize: 40,
        fontFamily: "Quicksand-700",
        textAlign: "center",
        marginBottom: 10,
    },

    subtitle: {
        fontSize: 20,
        fontFamily: "Quicksand-600",
        opacity: 0.5,
        textAlign: "center"
    },

    confirm: {
        color: "black",
        fontSize: 20,
        fontFamily: "Quicksand-700",
    }
});

