import { ImageSourcePropType } from "react-native";
import { Chapter, Novel, NovelGenre } from "./models";
export * from "./routing";

export type Slide = {
    id: string;
    title: string;
    description: string;
    image: ImageSourcePropType;
    nextTitle?: string
}

export type RadioInputOption = {
    label: string;
    value: string;
    imgSrc: ImageSourcePropType;
}

export type Action = {
    icon: string;
    title: string;
    onPress: (item?: Novel | Chapter) => void;
}

export type TabItem = {
    label: string;
}

export type UIGenre = {
    title: string,
    value: NovelGenre,
    description: string,
    cover: ImageSourcePropType;
}