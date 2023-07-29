import { getDocs, query, where } from "firebase/firestore";
import { Activity, ActivityType, Chapter, ChapterStatus, Entity, Like, Novel, NovelGenre, NovelStatus, Read } from "../../types/models";
import { getUserProfile } from "../auth";
import { createAuthoredEntity, deleteEntityById, getColRefFromDocMap, getEntitiesByUser, getEntityById, getEntityRefById, getPublicEntities, updateEntity, uploadUserFile } from "../base";

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

export type EditChapterInput = {
    chapterId: string;
    title?: string;
    body?: string;
}

export type EditChapterOutput = Promise<void>;

export async function editChapter({ chapterId, ...input }: EditChapterInput): EditChapterOutput {
    const chapterRef = await getEntityRefById({ id: chapterId, type: "chapter" });
    if (!chapterRef) throw new Error("Error: Chapter not found");
    await updateEntity(chapterRef, input);
}

export type DeleteChapterInput = {
    chapterId: string;
}

export type DeleteChapterOutput = Promise<void>;

export async function deleteChapter({ chapterId }: DeleteChapterInput): DeleteChapterOutput {
    await deleteEntityById(chapterId, "chapter");
}

export type UpdateChapterStatusInput = {
    chapterId: string;
    status: ChapterStatus;
}

export async function updateChapterStatus({ chapterId, status }: UpdateChapterStatusInput) {
    const chapterRef = await getEntityRefById({ id: chapterId, type: "chapter" });

    if (!chapterRef) {
        throw new Error("Chapitre Introuvable");
    }

    await updateEntity<Chapter>(chapterRef, {
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

export type CreateNovelInput = {
    title: string;
    description: string;
    genre: NovelGenre;
    isMature: boolean;
    coverImg?: Blob | File;
    userId?: string;
}

export type CreateNovelOutput = Promise<Novel>;

export async function uploadNovelCover(userId: string, title: string, coverImg: File | Blob) {
    return await uploadUserFile(userId, `covers/covers/${title.split(" ").join("_")}.jpeg`, coverImg);
}

export async function createNovel({ userId, ...input }: CreateNovelInput): CreateNovelOutput {
    let coverUrl = input?.coverImg ? await uploadNovelCover(userId, input.title, input.coverImg) : "";
    delete input.coverImg;
    const payload: Novel = { status: "draft", coverUrl, ...input };
    const result = await createAuthoredEntity(userId, payload, "novel");
    return result;
}

export type EditNovelInput = {
    userId: string;
    novelId: string;
    title?: string;
    description?: string;
    genre?: NovelGenre;
    isMature?: boolean;
    coverImg?: Blob | File;
}

export type EditNovelOutput = Promise<void>;

export async function editNovel({ novelId, ...input }: EditNovelInput): EditNovelOutput {
    const novelRef = await getEntityRefById({ id: novelId, type: "novel" });
    if (!novelRef) throw new Error("Error: Novel not found");

    let coverUrl = input?.coverImg ? await uploadNovelCover(input.userId, input.title, input.coverImg) : "";

    delete input.coverImg;

    let payload: any = {
        ...input
    }

    if (coverUrl) {
        payload = { ...payload, coverUrl }
    }

    await updateEntity(novelRef, payload);
}

export type DeleteNovelInput = {
    novelId: string;
}

export type DeleteNovelOutput = Promise<void>;

export async function deleteNovel({ novelId }: DeleteNovelInput): DeleteNovelOutput {
    await deleteEntityById(novelId, "novel");
}

export type UpdateNovelStatusInput = {
    novelId: string;
    status: NovelStatus;
}

export async function updateNovelStatus({ novelId, status }: UpdateNovelStatusInput) {
    const novelRef = await getEntityRefById({ id: novelId, type: "novel" });

    if (!novelRef) {
        throw new Error("Histoire Introuvable");
    }

    await updateEntity<Novel>(novelRef, {
        status
    })
}

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

export async function getPublicNovels(): Promise<GetPublicNovelsOutput> {
    return await getPublicEntities<Novel>({ type: "novel" })
}

export type GetPublicChaptersFromNovelInput = {
    novelId: string;
}

export type GetPublicChaptersFromNovelOutput = Promise<Array<Chapter>>

export async function getPublicChaptersFromNovel({ novelId }: GetPublicChaptersFromNovelInput): GetPublicChaptersFromNovelOutput {
    const modelRef = getColRefFromDocMap("chapter");
    const q = query(modelRef, where("status", "==", "published"), where("novelId", "==", novelId));
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

export type CreateActivityInput = {
    userId: string;
    activityType: ActivityType;
    entityId: string;
    options?: any;
}

export type CreateActivityOutput = Promise<Activity>

export async function createActivity({ userId, activityType, entityId, options }: CreateActivityInput): CreateActivityOutput {
    return await createAuthoredEntity(userId, {
        entityId,
        type: activityType,
        options
    }, "activity");
}

export type GetUserActivitiesInput = {
    userId: string;
}

export async function getUserActivities({ userId }: GetUserActivitiesInput) {
    return await getEntitiesByUser<Activity>({ userId, type: "activity" });
}

export type GetNovelInput = {
    novelId: string;
}

export type GetNovelOutput = Promise<Novel>;

export async function getNovel({ novelId }: GetNovelInput): GetNovelOutput {
    return await getEntityById({ id: novelId, type: "novel" });
}

export async function getReaderNovelFromNovel(novel: Novel) {
    const chapters = await getPublicChaptersFromNovel({ novelId: novel.id });
    if (chapters.length !== 0) {
        const author = await getUserProfile({ userId: novel.authorId });
        const authorNovels = await getUserNovels({ userId: novel.authorId });
        return { ...novel, chapters, author: author.userProfile, authorNovels };
    }
    return null;
}

export type GetNovelRecommendationsInput = {
    latestActivities: Array<Activity>;
    favouriteGenres: Array<NovelGenre>;
}

export async function getNovelRecommendations({ latestActivities, favouriteGenres }: GetNovelRecommendationsInput) {
    // TODO: Implement
}

export type GetUniqueChapterEntityByUserInput = {
    userId: string;
    chapterId: string;
    type: Entity;
}

export async function getUniqueChapterEntityByUser<T>({ userId, chapterId, type }: GetUniqueChapterEntityByUserInput) {
    const modelRef = getColRefFromDocMap(type);
    const q = query(modelRef, where("chapterId", "==", chapterId), where("authorId", "==", userId));
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

    return await createAuthoredEntity<Read>(userId, { chapterId }, "read");
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

    await createAuthoredEntity<Like>(userId, { chapterId }, "like");
    return true;
}