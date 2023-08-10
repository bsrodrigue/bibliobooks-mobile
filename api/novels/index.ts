import { arrayRemove, arrayUnion, getDocs, orderBy, query, updateDoc, where } from "firebase/firestore";
import { Chapter, EntityType, Library, Like, Novel, NovelGenre, NovelStatus, Read } from "../../types/models";
import { getUserProfile } from "../auth";
import { createOwnedEntity, deleteEntityById, getColRefFromDocMap, getEntitiesOwnedByUser, getEntitiesWhere, getEntityById, getEntityRefById, getPublicEntities, updateEntity, uploadUserFile } from "../base";

export async function uploadNovelCover(title: string, coverImg: File | Blob) {
    return await uploadUserFile(`covers/covers/${title.split(" ").join("_")}.jpeg`, coverImg);
}

export async function getNovelChapters(novelId: string): Promise<Array<Chapter>> {
    const modelRef = getColRefFromDocMap("chapter");
    const q = query(modelRef, where("novelId", "==", novelId), orderBy("order", "asc"));
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

export async function createNovel({ userId, coverImg, ...input }: CreateNovelInput) {
    const coverUrl = coverImg ? await uploadNovelCover(input.title, coverImg) : "";
    const payload = { status: "draft", coverUrl, ...input };
    return await createOwnedEntity(userId, payload, "novel");
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

export type EditNovelOutput = Promise<Novel>;

export async function editNovel({ novelId, userId, coverImg, ...input }: EditNovelInput): EditNovelOutput {
    const novelRef = await getEntityRefById(novelId, "novel");
    const coverUrl = coverImg ? await uploadNovelCover(input.title, coverImg) : "";
    const payload = { ...input, coverUrl };
    return await updateEntity<Novel>(novelRef, payload) as Novel;
}

export type DeleteNovelInput = {
    novelId: string;
}

export async function deleteNovel({ novelId }: DeleteNovelInput) {
    await deleteEntityById(novelId, "novel");
}

export type UpdateNovelStatusInput = {
    novelId: string;
    status: NovelStatus;
}

export async function updateNovelStatus({ novelId, status }: UpdateNovelStatusInput) {
    const novelRef = await getEntityRefById(novelId, "novel");
    return await updateEntity<Novel>(novelRef, { status });
}

export type GetUserNovelsInput = {
    userId: string;
}

export type GetUserNovelsOutput = Promise<Array<Novel>>

export async function getUserNovels(): Promise<GetUserNovelsOutput> {
    return [];
}

export type GetUserLibraryInput = {
    userId: string;
}

export async function getLibrary({ userId }: GetUserLibraryInput) {
    const library = await getEntitiesOwnedByUser<Library>(userId, "library");

    if (!library.length) {
        return await createLibrary({ userId });
    }

    return library[0];
}

export type CreateLibraryInput = {
    userId: string;
}

export async function createLibrary({ userId }: CreateLibraryInput) {
    return await createOwnedEntity(userId, { novels: [] }, "library");
}

export async function getPublicNovels() {
    return await getPublicEntities<Novel>("novel");
}

export type GetPublicChaptersFromNovelInput = {
    novelId: string;
}

export type GetPublicChaptersFromNovelOutput = Promise<Array<Chapter>>

export async function getPublicChaptersFromNovel({ novelId }: GetPublicChaptersFromNovelInput): GetPublicChaptersFromNovelOutput {
    const modelRef = getColRefFromDocMap("chapter");
    const q = query(modelRef, where("status", "==", "published"), where("novelId", "==", novelId), orderBy("order"));
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

export type GetNovelInput = {
    novelId: string;
}

export type GetNovelOutput = Promise<Novel>;

export async function getNovel({ novelId }: GetNovelInput): GetNovelOutput {
    return await getEntityById(novelId, "novel");
}

export async function getReaderNovelFromNovel(novel: Novel) {
    const chapters = await getPublicChaptersFromNovel({ novelId: novel.id });
    if (chapters.length !== 0) {
        const author = await getUserProfile({ userId: novel.ownerId });
        const authorNovels = await getUserNovels();
        return { ...novel, chapters, author: author.userProfile, authorNovels };
    }
    return null;
}

export type AddToLibraryInput = {
    novelId: string;
    userId: string;
}

export async function addToLibrary({ novelId, userId }: AddToLibraryInput) {
    const library = await getLibrary({ userId });
    const libraryRef = await getEntityRefById(library.id, "library");
    await updateDoc(libraryRef, {
        novels: arrayUnion(novelId)
    });
}
export type RemoveFromLibraryInput = {
    novelId: string;
    userId: string;
}
export async function removeFromLibrary({ novelId, userId }: RemoveFromLibraryInput) {
    const library = await getLibrary({ userId });
    const libraryRef = await getEntityRefById(library.id, "library");
    await updateDoc(libraryRef, {
        novels: arrayRemove(novelId)
    });
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