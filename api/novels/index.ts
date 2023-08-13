import { getDocs, query, where } from "firebase/firestore";
import { EntityType, Like, Novel, NovelGenre, NovelStatus, Read } from "../../types/models";
import { createOwnedEntity, deleteEntityById, getColRefFromDocMap, getEntityById, uploadUserFile } from "../base";
import client from "../client";

export async function uploadNovelCover(title: string, coverImg: File | Blob) {
    return await uploadUserFile(`covers/covers/${title.split(" ").join("_")}.jpeg`, coverImg);
}

export type CreateNovelInput = {
    title: string;
    description: string;
    genre: NovelGenre;
    isMature: boolean;
    coverImg?: Blob | File;
}

export async function createNovel({ coverImg, ...input }: CreateNovelInput): Promise<Novel> {
    const coverUrl = coverImg ? await uploadNovelCover(input.title, coverImg) : "";
    const payload = { coverUrl, ...input };
    const result = await client.post("workshop/createNovel", payload);
    return result.data;
}

export type EditNovelInput = {
    novelId: number;
    title?: string;
    description?: string;
    genre?: NovelGenre;
    isMature?: boolean;
    coverImg?: Blob | File;
}

export async function editNovel({ coverImg, ...input }: EditNovelInput): Promise<Novel> {
    const coverUrl = coverImg ? await uploadNovelCover(input.title, coverImg) : "";
    const payload = { ...input, coverUrl };
    const result = await client.post("workshop/updateNovel", payload);
    return result.data;
}

export type DeleteNovelInput = {
    novelId: number;
}

export async function deleteNovel({ novelId }: DeleteNovelInput) {
    await client.post("workshop/deleteNovel", { novelId });
}

export type UpdateNovelStatusInput = {
    novelId: number;
    status: NovelStatus;
}

export async function updateNovelStatus({ novelId, status }: UpdateNovelStatusInput) {
    const result = await client.post("workshop/updateNovel", { novelId, status });
    return result.data;
}

export type GetUserNovelsInput = {
    userId: number;
}

export type GetUserNovelsOutput = Promise<Array<Novel>>

export async function getUserNovels() {
    const result = await client.get("workshop/novels");
    return result.data;
}

export async function getLibrary() {
    const result = await client.get("library/me");
    return result.data;
}

export async function getPublicNovels() {
    const result = await client.get("novels");
    return result.data;
}

export async function getPublicAuthorNovels({ authorId }) {
    const result = await client.get("novels/author/" + authorId);
    return result.data;
}

export type GetPublicChaptersFromNovelInput = {
    novelId: string;
}

export type GetNovelInput = {
    novelId: string;
}

export type GetNovelOutput = Promise<Novel>;

export async function getNovel({ novelId }: GetNovelInput): GetNovelOutput {
    return await getEntityById(novelId, "novel");
}

export async function addToLibrary(novelId: number) {
    return await client.post("library/me/add", { novelId });
}

export async function removeFromLibrary(novelId: number) {
    return await client.post("library/me/remove", { novelId });
}

export type GetUniqueChapterEntityByUserInput = {
    userId: string;
    chapterId: string;
    type: EntityType;
}

export async function getUniqueChapterEntityByUser<T>({ userId, chapterId, type }: GetUniqueChapterEntityByUserInput) {
    const modelRef = getColRefFromDocMap(type);
    const q = query(modelRef, where("chapterId", "==", chapterId), where("ownerId", "==", userId));
    const qs = await getDocs(q);

    if (qs.empty) {
        return null;
    }

    return qs.docs[0].data() as T;
}

export type GetReadByUserInput = {
    userId: string;
    chapterId: string;
}

export async function getReadByUser({ userId, chapterId }: GetReadByUserInput) {
    return await getUniqueChapterEntityByUser<Read>({ userId, chapterId, type: "read" });
}

export type GetLikeByUserInput = {
    userId: string;
    chapterId: string;
}

export async function getLikeByUser({ userId, chapterId }: GetLikeByUserInput) {
    return await getUniqueChapterEntityByUser<Like>({ userId, chapterId, type: "like" });
}

export type CreateReadInput = {
    userId: string;
    chapterId: string;
}

export async function createRead({ userId, chapterId }: CreateReadInput) {
    const existingRead = await getReadByUser({ userId, chapterId });
    if (existingRead) return;

    return await createOwnedEntity(userId, { entityId: chapterId }, "read");
}

export type LikeInput = {
    userId: string;
    chapterId: string;
}

export async function like({ userId, chapterId }: LikeInput) {
    const existingLike = await getLikeByUser({ userId, chapterId });
    if (existingLike) {
        await deleteEntityById(existingLike.id, "like");
        return false;
    }

    await createOwnedEntity(userId, { entityId: chapterId }, "like");
    return true;
}