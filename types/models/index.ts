import { ImageSourcePropType } from "react-native";
import { UserProfile } from "../auth";

export interface BaseModel {
    id?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface HasAuthor {
    authorId?: string;
}

export interface Like
    extends
    BaseModel,
    HasAuthor {
    chapterId: string;
}

export interface Read
    extends
    BaseModel,
    HasAuthor {
    chapterId: string;
}

export interface Comment
    extends
    BaseModel,
    HasAuthor {
    body: string;
    chapterId: string;
}

export interface Novel
    extends
    BaseModel,
    HasAuthor {
    title: string;
    description: string;
    coverUrl?: string;
    isMature?: boolean;
    genre: NovelGenre;
    status: NovelStatus;
}

export interface ReaderNovel
    extends Novel {
    chapters: Array<Chapter>;
    author: UserProfile;
    authorNovels: Array<Novel>;
    likes?: Array<Like>;
    reads?: Array<Read>;
    comments?: Array<Comment>;
}

export interface Chapter
    extends
    BaseModel,
    HasAuthor {
    title: string;
    body: string;
    status: ChapterStatus;
    novelId: string;
    order: number;
}

export interface Activity
    extends
    BaseModel,
    HasAuthor {
    entityId: string;
    type: ActivityType;
    options?: any;
}

export interface library
    extends BaseModel,
    HasAuthor {
    novels: Array<Novel | ReaderNovel>;
}

export type ActivityType = "reading" | "writing";

export type ChapterStatus = NovelStatus;

export type NovelStatus = "published" | "draft" | "archived" | "banned";

export type NovelGenre = "adventure" | "action" | "fantasy" | "romance" | "traditional" | "historical" | "horror";

export type Genre = {
    title: string;
    description: string;
    cover: ImageSourcePropType;
}

export type Entity = "novel" | "chapter" | "user_profile" | "activity" | "like" | "comment" | "read" | "library";

export type FireBaseEntityDoc = {
    root: string;
    pathSegments?: Array<string>;
}

export type FireBaseEntityDocMap = Record<Entity, FireBaseEntityDoc>