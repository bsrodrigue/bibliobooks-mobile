import { ImageSourcePropType } from "react-native";
import Crypto from "../lib/crypto";
import { RadioInputOption } from "../types";
import { NovelGenre } from "../types/models";

const genderOptions: RadioInputOption[] = [
    { label: "Homme", value: "MALE", imgSrc: require("../assets/illustrations/male.png") },
    { label: "Femme", value: "FEMALE", imgSrc: require("../assets/illustrations/female.png") },
]

const baseGenreCoverUrl = "../assets/images";

const novelGenresMap: Record<NovelGenre, {
    title: string;
    description?: string;
    cover?: ImageSourcePropType;
}> = {
    ADVENTURE: {
        title: "Aventure",
        description: "",
        cover: require(`${baseGenreCoverUrl}/adventure.jpg`)
    },
    ACTION: {
        title: "Action",
        description: "",
        cover: require(`${baseGenreCoverUrl}/action.jpg`)
    },
    FANTASY: {
        title: "Fantasy",
        description: "",
        cover: require(`${baseGenreCoverUrl}/fantasy.jpg`)
    },
    ROMANCE: {
        title: "Romance",
        description: "",
        cover: require(`${baseGenreCoverUrl}/romance.jpg`)
    },
    TRADITIONAL: {
        title: "Traditionnel",
        description: "",
        cover: require(`${baseGenreCoverUrl}/traditional.jpg`)
    },
    HISTORICAL: {
        title: "Historique",
        description: "",
        cover: require(`${baseGenreCoverUrl}/historical.jpg`)
    },
    HORROR: {
        title: "Horreur",
        description: "",
        cover: require(`${baseGenreCoverUrl}/horror.jpg`)
    },
    SCIFI: {
        title: "Sci-Fi",
        description: "",
        cover: require(`${baseGenreCoverUrl}/scifi.jpg`)
    },
    MYSTERY: {
        title: "Mystère",
        description: "",
        cover: require(`${baseGenreCoverUrl}/mystery.jpg`)
    },
    DRAMA: {
        title: "Drama",
        description: "",
        cover: require(`${baseGenreCoverUrl}/drama.jpg`)
    }
}

const genreSelectOptions = Object.keys(novelGenresMap).map((key) => ({
    cover: novelGenresMap[key]?.cover,
    description: novelGenresMap[key]?.description,
    selected: false,
    title: novelGenresMap[key]?.title,
    value: key,
}))

const wrapperHorizontalPadding = 40;

const defaultIdGenerator = {
    generateId: Crypto.generateRandomUUID,
};

export const config = {
    genderOptions,
    novelGenresMap,
    genreSelectOptions,
    wrapperHorizontalPadding,
    defaultIdGenerator,
};