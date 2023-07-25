import { User, createUserWithEmailAndPassword } from "firebase/auth";
import { getDocs, query, where } from "firebase/firestore";
import { auth } from "../../config/firebase";
import { UserProfile } from "../../types/auth";
import { NovelGenre } from "../../types/models";
import { createEntity, getColRefFromDocMap, updateEntity, uploadFile } from "../base";

export type RegisterInput = {
    email: string;
    password: string;
};

export type RegisterOutput = UserProfile;

export async function register({ email, password }: RegisterInput) {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    return await createUserProfile(user);
}

export async function createUserProfile(user: User): Promise<UserProfile> {
    const profile = {
        userId: user.uid,
        isAccountSetup: false,
        email: user.email,
    }

    return await createEntity(profile, "user_profile");
}

export type SetupAccountInput = {
    userId?:string;
    firstName: string;
    lastName: string;
    birthdate: Date;
    pseudo: string;
    bio: string;
    gender: "male" | "female";
    avatarImage?: File;
    favouriteGenres?: Array<string>;
}

export type SetupAccountOutput = UserProfile;

export async function setupAccount(input: SetupAccountInput) {
    const ref = getColRefFromDocMap("user_profile");
    const q = query(ref, where("userId", "==", input.userId));

    const qs = await getDocs(q);

    if (qs.empty) {
        throw new Error("not found, userId:id")
    }

    const data = qs.docs[0].data() as UserProfile;

    delete input.userId;
    const result: SetupAccountOutput = {
        isAccountSetup: true, ...data, ...input
    }

    const resultRef = qs.docs[0].ref;
    await updateEntity(resultRef, result);
    this.userProfile = result;
}

type CreateNovelInput = {
    title?: string;
    description?: string;
    cover?: File;
    genre: NovelGenre;
    isMature?: boolean;
    authorId?: string;
}

export async function createNovel(novel: CreateNovelInput) {
    if (novel.cover) {
        const coverUrl = uploadFile(novel.cover);
    }

    novel.title = novel.title || "Nouvelle Histoire";
    novel.description = novel.description || "Nouvelle Histoire";
    novel.authorId = this.userId;

    return await createEntity(novel, "novel");
}

