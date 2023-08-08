import Crypto from "../lib/crypto";
import { RadioInputOption, UIGenre } from "../types";

const genderOptions: RadioInputOption[] = [
    { label: "Homme", value: "MALE", imgSrc: require("../assets/illustrations/male.png") },
    { label: "Femme", value: "FEMALE", imgSrc: require("../assets/illustrations/female.png") },
]

const genreTitleMap = {
    "ACTION": "Action",
    "ADVENTURE": "Aventure",
    "FANTASY": "Fantasy",
    "ROMANCE": "Romance",
    "TRADITIONAL": "Traditionnel",
};

const genres: Array<UIGenre> = [
    {
        title: "Action",
        value: "ACTION",
        description: "",
        cover: require("../assets/images/action.jpg")
    },
    {
        title: "Aventure",
        value: "ADVENTURE",
        description: "",
        cover: require("../assets/images/adventure.jpg")
    },
    {
        title: "Fantasy",
        value: "FANTASY",
        description: "",
        cover: require("../assets/images/fantasy.jpg")
    },
    {
        title: "Romance",
        value: "ROMANCE",
        description: "",
        cover: require("../assets/images/romance.jpg")
    },
    {
        title: "Traditionnel",
        value: "TRADITIONAL",
        description: "",
        cover: require("../assets/images/traditional.jpg")
    },
]

const wrapperHorizontalPadding = 40;

const defaultIdGenerator = {
    generateId: Crypto.generateRandomUUID,
};

export const config = {
    genderOptions,
    genres,
    genreTitleMap,
    wrapperHorizontalPadding,
    defaultIdGenerator,
};