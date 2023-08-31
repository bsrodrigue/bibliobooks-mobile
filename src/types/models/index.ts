import { ImageSourcePropType } from "react-native";
import { UserProfile } from "../auth";

export interface BaseModel {
    id: number;
    createdAt: string;
    updatedAt: string;
}

export interface HasOwner {
    ownerId: number;
}

export interface Read
    extends
    BaseModel,
    HasOwner {
    chapterId: string;
}

export interface Comment
    extends
    BaseModel,
    HasOwner {
    body: string;
    entityId: string;
}

export interface Novel
    extends
    BaseModel,
    HasOwner {
    title: string;
    description: string;
    coverUrl?: string;
    isMature?: boolean;
    genre: NovelGenre;
    status: NovelStatus;
    chapters?: Chapter[];
}

export interface Chapter
    extends
    BaseModel,
    HasOwner {
    title: string;
    body: string;
    status: ChapterStatus;
    novelId: string;
    order: number;
    likes?: Like[];
    reads?: Read[];
}

export interface Like
    extends
    BaseModel,
    HasOwner {
    chapterId: string;
}

export interface ReadingActivity
    extends
    BaseModel,
    HasOwner {
    novelId: string;
    chapterId: string;
}

export interface Library
    extends
    BaseModel,
    HasOwner {
    novels: Array<LibraryNovel>;
}

export type BaseEntityStatus = "PUBLISHED" | "DRAFT" | "ARCHIVED" | "BANNED";

export type ChapterStatus = BaseEntityStatus;

export type NovelStatus = BaseEntityStatus;

export type NovelGenre =
    "ADVENTURE" | "ACTION" | "FANTASY" |
    "ROMANCE" | "TRADITIONAL" | "HISTORICAL" |
    "HORROR" | "SCIFI" | "MYSTERY" | "DRAMA";

export type NovelGenreIllustration = {
    title: string;
    description: string;
    illustration: ImageSourcePropType;
}

export type EntityType = "novel" | "chapter" | "user_profile" | "reading_activity" | "like" | "comment" | "read" | "library";

export type FireBaseEntityDoc = {
    root: string;
}

export type FireBaseEntityDocMap = Record<EntityType, FireBaseEntityDoc>

export interface ReaderNovel
    extends Novel {
    chapters: Array<Chapter & { reads: any[]; likes: any[]; comments: any[] }>;
    owner: UserProfile & {
        creations?: {
            id: number;
            title: string;
        }[]
    };
}

export interface WorkshopNovel
    extends Novel {
    chapters: Array<Chapter>;
}

export interface LibraryNovel
    extends ReaderNovel {
}