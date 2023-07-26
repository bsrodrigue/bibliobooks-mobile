import { ImageSourcePropType } from "react-native";
import { Novel } from "./models";
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
    onPress: (novel?: Novel) => void;
}

export type TabItem = {
    label: string;
}

