import { ImageSourcePropType } from "react-native";
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

export type Genre = {
    title: string;
    description: string;
    cover: ImageSourcePropType;
}

export type Novel = {
    id?: string;
    title?: string;
    chapterCount?: number;
    description?: string;
    imgSrc?: ImageSourcePropType;
    mature?: boolean;
    author?: string;
    genre?: string;
    last?: boolean;
}

export type Action = {
    icon: string;
    title: string;
    onPress: () => void;
}