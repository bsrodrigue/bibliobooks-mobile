import { where } from "firebase/firestore";
import { Chapter, ChapterStatus, EntityType } from "../../types/models";
import { createOwnedEntity, deleteEntityById, getEntitiesWhere, getEntityRefById, updateEntity } from "../base";
import client from "../client";

export type CreateChapterInput = {
    title: string;
    body: string;
    novelId: string;
    order: number;
}

export async function createChapter(payload: CreateChapterInput) {
    const result = await client.post("workshop/createChapter", payload);
    return result.data;
}

export type EditChapterInput = {
    chapterId: string;
    title?: string;
    body?: string;
    order?: number;
    status?: ChapterStatus;
}

export async function editChapter(payload: EditChapterInput) {
    const result = await client.post("workshop/updateChapter", payload);
    return result.data;
}

export type DeleteChapterInput = {
    chapterId: string;
}

export async function deleteChapter({ chapterId }: DeleteChapterInput) {
    await client.post("workshop/deleteChapter", { chapterId });
}

export type UpdateChapterStatusInput = {
    chapterId: string;
    status: ChapterStatus;
}

export async function updateChapterStatus({ chapterId, status }: UpdateChapterStatusInput) {
    return await editChapter({ chapterId, status });
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