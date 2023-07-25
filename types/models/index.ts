export interface BaseModel {
    id?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface HasAuthor {
    authorId?: string;
}

export interface Like
    extends
    BaseModel,
    HasAuthor {
    likedChapterId: string;
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
}

export type NovelGenre = "adventure" | "action" | "fantasy" | "romance" | "traditional" | "historical" | "horror";

export type Entity = "novel" | "chapter" | "user_profile";

export type FireBaseEntityDoc = {
    root: string;
    pathSegments?: Array<string>;
}

export type FireBaseEntityDocMap = Record<Entity, FireBaseEntityDoc>

