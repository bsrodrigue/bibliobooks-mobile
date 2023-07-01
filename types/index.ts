import { ImageSourcePropType } from "react-native";

export * from "./routing";
export type Slide = {
    id: string;
    title: string;
    description: string;
    image: ImageSourcePropType;
    nextTitle?: string
}