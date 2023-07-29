import { query, where, getDocs } from "firebase/firestore";
import { Entity } from "../../types/models";
import { getColRefFromDocMap } from "../base";

export type GetEntitiesByChapter = {
    chapterId: string;
    type: Entity;
}

export async function getEntitiesByChapter<T>({ chapterId, type }: GetEntitiesByChapter) {
    const modelRef = getColRefFromDocMap(type);
    const q = query(modelRef, where("chapterId", "==", chapterId));
    const qs = await getDocs(q);

    if (qs.empty) {
        return [];
    }

    const result = [];
    qs.docs.forEach((doc) => {
        result.push(doc.data());
    })

    return result as Array<T>;
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