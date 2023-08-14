import FontFamilyStylesheet from "./stylesheet";
const fontFamily = 'EB Garamond';

export default (light: boolean) => {
    return {
        initialCSSText: `${FontFamilyStylesheet}`,
        contentCSSText: `font-family: ${fontFamily}`,
        backgroundColor: "transparent",
        color: light ? "black" : "white"
    }
};