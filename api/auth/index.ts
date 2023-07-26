import { User, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { DocumentData, DocumentReference, getDocs, query, where } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { auth, storage } from "../../config/firebase";
import { UserProfile } from "../../types/auth";
import { NovelGenre } from "../../types/models";
import { createEntity, getColRefFromDocMap, updateEntity, uploadFile } from "../base";

export type GetUserProfileInput = {
    userId: string;
}

export type GetUserProfileOutput = {
    userProfile: UserProfile;
    userProfileRef: DocumentReference<DocumentData, DocumentData>;
};

export async function getUserProfile({ userId }: GetUserProfileInput) {
    const userProfilesRef = getColRefFromDocMap("user_profile");
    const q = query(userProfilesRef, where("userId", "==", userId));
    const qs = await getDocs(q);

    if (qs.empty) {
        throw new Error("User does not have a user profile");
    }

    const userProfile = qs.docs[0].data() as UserProfile;

    return { userProfile, userProfilesRef };
}

export type RegisterInput = {
    email: string;
    password: string;
};

export type RegisterOutput = UserProfile;

export async function register({ email, password }: RegisterInput): Promise<RegisterOutput> {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    const { userProfile } = await getUserProfile({ userId: user.uid });
    return userProfile;
}

export async function createUserProfile(user: User): Promise<UserProfile> {
    const profile = {
        userId: user.uid,
        isAccountSetup: false,
        email: user.email,
    }

    return await createEntity(profile, "user_profile");
}

export type LoginInput = {
    email: string;
    password: string;
}

export type LoginOutput = UserProfile;

export async function login({ email, password }: RegisterInput): Promise<LoginOutput> {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    const { userProfile } = await getUserProfile({ userId: user.uid });
    return userProfile;
}

export type SetupAccountInput = {
    userId?: string;
    firstName: string;
    lastName: string;
    birthdate: Date;
    pseudo: string;
    bio: string;
    gender: "male" | "female";
    avatarBase64?: string;
    favouriteGenres?: Array<string>;
}

export type SetupAccountOutput = UserProfile;

export async function setupAccount(input: SetupAccountInput): Promise<SetupAccountOutput> {
    const { userProfile, userProfilesRef } = await getUserProfile({ userId: input.userId });

    let avatarUrl = "";
    if (input.avatarBase64) {
        const avatarStorageRef = ref(storage, `files/users/avatars/${input.userId}/avatar.jpg`);
        const result = await uploadString(avatarStorageRef, input.avatarBase64)
        avatarUrl = await getDownloadURL(result.ref);
    }

    delete input.userId;
    delete input.avatarBase64;

    const result: SetupAccountOutput = {
        ...userProfile, ...input, avatarUrl, isAccountSetup: true
    }

    await updateEntity(userProfilesRef, result);
    return result;
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

