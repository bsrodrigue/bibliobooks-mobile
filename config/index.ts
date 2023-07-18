import { RadioInputOption } from "../types";

const genderOptions: RadioInputOption[] = [
    { label: "Homme", value: "male", imgSrc: require("../assets/illustrations/male.png") },
    { label: "Femme", value: "female", imgSrc: require("../assets/illustrations/female.png") },
]

const genreTitleMap = {
    "action": "Action",
    "adventure": "Aventure",
    "fantasy": "Fantasy",
    "romance": "Romance",
    "traditional": "Traditionnel",
};

const genres = [
    {
        title: "Action",
        value: "action",
        description: "",
        cover: require("../assets/images/action.jpg")
    },
    {
        title: "Aventure",
        value: "adventure",
        description: "",
        cover: require("../assets/images/adventure.jpg")
    },
    {
        title: "Fantasy",
        value: "fantasy",
        description: "",
        cover: require("../assets/images/fantasy.jpg")
    },
    {
        title: "Romance",
        value: "romance",
        description: "",
        cover: require("../assets/images/romance.jpg")
    },
    {
        title: "Traditionnel",
        value: "traditional",
        description: "",
        cover: require("../assets/images/traditional.jpg")
    },
]

const wrapperHorizontalPadding = 40;

export const config = {
    genderOptions,
    genres,
    genreTitleMap,
    wrapperHorizontalPadding,
};