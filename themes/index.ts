import { createTheme } from "@rneui/themed";

const commonColors = {
    // primary: "#22A39F",
    primary: "#6C3428",
    // black: "#0A514F",
    black: "#000000",
    error: "#DF2E38",
    greyOutline: "#CCCCCC",
}

export const lightTheme = createTheme({
    lightColors: commonColors,
    darkColors: {
        ...commonColors,
        background: "black"
    },
})
