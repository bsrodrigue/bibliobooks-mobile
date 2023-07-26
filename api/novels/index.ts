import { Novel, NovelGenre } from "../../types/models";
import { createAuthoredEntity, getEntitiesByUser, uploadUserFile } from "../base";

export type GetUserNovelsInput = {
    userId: string;
}

export type GetUserNovelsOutput = Promise<Array<Novel>>

export async function getUserNovels({ userId }: GetUserNovelsInput): Promise<GetUserNovelsOutput> {
    return await getEntitiesByUser<Novel>({ userId, type: "novel" })
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