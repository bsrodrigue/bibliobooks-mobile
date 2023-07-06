import { RadioInputOption } from "../types";

const genderOptions: RadioInputOption[] = [
    { label: "Homme", value: "male" },
    { label: "Femme", value: "female" },
]

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
        title: "Traditionel",
        value: "traditional",
        description: "",
        cover: require("../assets/images/traditional.jpg")
    },
]

export const config = {
    genderOptions,
    genres,
};