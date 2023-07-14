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
    status?: NovelStatus;
}

export type Chapter = {
    id?: string;
    title?: string;
    body?: string;
    genre?: string;
    last?: boolean;
    status?: ChapterStatus;

    likeCount?: number;
    commentCount?: number;
    wordCount?: number;

    createdAt?: string;
    editedAt?: string;
}

export type ChapterStatus = NovelStatus;
export type NovelStatus = "published" | "draft" | "archived";

export type Action = {
    icon: string;
    title: string;
    onPress: () => void;
}

export type TabItem = {
    label: string;
}