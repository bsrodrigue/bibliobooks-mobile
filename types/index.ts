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
}

export type Genre = {
    title: string;
    description: string;
    cover: ImageSourcePropType;
}