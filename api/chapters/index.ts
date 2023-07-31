import { where } from "firebase/firestore";
import { Chapter, ChapterStatus, EntityType } from "../../types/models";
import { createOwnedEntity, deleteEntityById, getEntitiesWhere, getEntityRefById, updateEntity } from "../base";

export type CreateChapterInput = {
    title: string;
    body: string;
    novelId: string;
    order: number;
    userId: string;
}

export async function createChapter({ userId, ...input }: CreateChapterInput) {
    const payload = { status: "draft", ...input };
    const result = await createOwnedEntity(userId, payload, "chapter");
    return result;
}

export type EditChapterInput = {
    chapterId: string;
    title?: string;
    body?: string;
}

export async function editChapter({ chapterId, ...input }: EditChapterInput) {
    const chapterRef = await getEntityRefById(chapterId, "chapter");
    return await updateEntity<Chapter>(chapterRef, input);
}

export type DeleteChapterInput = {
    chapterId: string;
}

export async function deleteChapter({ chapterId }: DeleteChapterInput) {
    await deleteEntityById(chapterId, "chapter");
}

export type UpdateChapterStatusInput = {
    chapterId: string;
    status: ChapterStatus;
}

export async function updateChapterStatus({ chapterId, status }: UpdateChapterStatusInput) {
    const chapterRef = await getEntityRefById(chapterId, "chapter");
    return await updateEntity<Chapter>(chapterRef, { status })
}

export type GetEntitiesByChapter = {
    chapterId: string;
    type: EntityType;
}

export async function getEntitiesByChapter<T>({ chapterId, type }: GetEntitiesByChapter) {
    return await getEntitiesWhere(type, where("entityId", "==", chapterId));
}

export type GetReadsByChapter = {
    chapterId: string;
}

export async function getReadsByChapter({ chapterId }: GetReadsByChapter) {
    return await getEntitiesByChapter({ chapterId, type: "read" });
}

export type GetLikesByChapter = {
    chapterId: string;
}

export async function getLikesByChapter({ chapterId }: GetLikesByChapter) {
    return await getEntitiesByChapter({ chapterId, type: "like" });
}

export type GetCommentsByChapter = {
    chapterId: string;
}

export async function getCommentsByChapter({ chapterId }: GetCommentsByChapter) {
    return await getEntitiesByChapter({ chapterId, type: "comment" });
}