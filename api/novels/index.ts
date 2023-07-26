import { getDocs, query, where } from "firebase/firestore";
import { Chapter, Novel, NovelGenre, NovelStatus } from "../../types/models";
import { createAuthoredEntity, getColRefFromDocMap, getEntitiesByUser, getEntityRefById, getPublicEntities, updateEntity, uploadUserFile } from "../base";

export type GetUserNovelsInput = {
    userId: string;
}

export type GetUserNovelsOutput = Promise<Array<Novel>>

export async function getUserNovels({ userId }: GetUserNovelsInput): Promise<GetUserNovelsOutput> {
    return await getEntitiesByUser<Novel>({ userId, type: "novel" })
}

export type GetPublicNovelsInput = {
}

export type GetPublicNovelsOutput = Promise<Array<Novel>>

export async function getPublicNovels({ }: GetPublicNovelsInput): Promise<GetPublicNovelsOutput> {
    return await getPublicEntities<Novel>({ type: "novel" })
}

export type CreateNovelInput = {
    title: string;
    description: string;
    genre: NovelGenre;
    isMature: boolean;
    coverImg?: Blob | File;
    userId?: string;
}

export type CreateNovelOutput = Promise<Novel>;

export async function createNovel({ userId, ...input }: CreateNovelInput): CreateNovelOutput {
    let coverUrl = "";
    if (input.coverImg) {
        coverUrl = await uploadUserFile(userId, `covers/covers/${input.title.split(" ").join("_")}.jpeg`, input.coverImg);
        delete input.coverImg;
    }
    const payload: Novel = { status: "draft", coverUrl, ...input };
    const result = await createAuthoredEntity(userId, payload, "novel");
    return result;
}

export type CreateChapterInput = {
    title: string;
    body: string;
    novelId: string;
    order: number;
    userId: string;
}

export type CreateChapterOutput = Promise<Chapter>;

export async function createChapter({ userId, ...input }: CreateChapterInput): CreateChapterOutput {
    const payload: Chapter = { status: "draft", ...input };
    const result = await createAuthoredEntity(userId, payload, "chapter");
    return result;
}

export type UpdateNovelStatus = {
    novelId: string;
    status: NovelStatus;
}

export async function updateNovelStatus({ novelId, status }: UpdateNovelStatus) {
    const novelRef = await getEntityRefById({ id: novelId, type: "novel" });

    if (!novelRef) {
        throw new Error("Histoire Introuvable");
    }

    await updateEntity<Novel>(novelRef, {
        status
    })
}

export type GetNovelChapters = {
    novelId: string;
}

export async function getNovelChapters({ novelId }: GetNovelChapters): Promise<Array<Chapter>> {
    const modelRef = getColRefFromDocMap("chapter");
    const q = query(modelRef, where("novelId", "==", novelId));
    const qs = await getDocs(q);

    if (qs.empty) {
        return [];
    }

    const result = [];
    qs.docs.forEach((doc) => {
        result.push(doc.data());
    })

    return result;
}