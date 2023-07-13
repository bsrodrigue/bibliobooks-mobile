import { createTheme } from "@rneui/themed";

export const lightTheme = createTheme({
    lightColors: {
        primary: "#22A39F",
        black: "#0A514F",
        error: "#DF2E38",
        greyOutline: "#CCCCCC",
    },
    darkColors: {
        primary: "#22A39F",
        error: "#DF2E38",
        greyOutline: "#CCCCCC",
    },
    components: {
        Text: {
            style: {
                fontFamily: "Quicksand-500"
            }
        },

        Button: {
            titleStyle: {
                fontFamily: "Quicksand-500"
            }
        }
    }
})

