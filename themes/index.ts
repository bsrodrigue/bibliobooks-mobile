import { createTheme } from "@rneui/themed";

const commonColors = {
    primary: "#22A39F",
    black: "black",
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
