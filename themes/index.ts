import { createTheme } from "@rneui/themed";

const commonColors = {
    primary: "#22A39F",
    black: "#0A514F",
    error: "#DF2E38",
    greyOutline: "#CCCCCC",
}

export const lightTheme = createTheme({
    lightColors: commonColors,
    darkColors: commonColors,
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
