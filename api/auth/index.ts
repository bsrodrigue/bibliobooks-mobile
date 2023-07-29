import { User, createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword } from "firebase/auth";
import { getDocs, query, where } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, storage } from "../../config/firebase";
import { UserProfile } from "../../types/auth";
import { createEntity, getColRefFromDocMap, updateEntity } from "../base";

export type GetUserProfileInput = {
    userId: string;
}

export type GetUserProfileOutput = {
    userProfile: UserProfile;
    userProfileRef: any;
};

export async function getUserProfile({ userId }: GetUserProfileInput): Promise<GetUserProfileOutput> {
    const userProfilesRef = getColRefFromDocMap("user_profile");
    const q = query(userProfilesRef, where("userId", "==", userId));
    const qs = await getDocs(q);

    if (qs.empty) {
        throw new Error("User does not have a user profile");
    }

    const userProfile = qs.docs[0].data() as UserProfile;

    return { userProfile, userProfileRef: qs.docs[0].ref };
}

export type RegisterInput = {
    email: string;
    password: string;
};

export type RegisterOutput = UserProfile;

export async function register({ email, password }: RegisterInput): Promise<RegisterOutput> {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    await sendEmailVerification(user);
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

export type UpdateUserProfile = {
    userId: string;
    profile: Partial<UserProfile>;
    avatarImg?: Blob | File;
}

export async function updateUserProfile({ userId, profile, avatarImg }: UpdateUserProfile) {
    const { userProfileRef } = await getUserProfile({ userId });

    if (avatarImg) {
        const avatarRef = ref(storage, `files/users/${userId}/avatar/avatar.jpeg`);
        const result = await uploadBytes(avatarRef, avatarImg);
        const downloadUrl = await getDownloadURL(result.ref);
        profile.avatarUrl = downloadUrl;
    }

    await updateEntity(userProfileRef, { ...profile });
    return profile;
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
    avatarImg?: File | Blob;
    favouriteGenres?: Array<string>;
}

export type SetupAccountOutput = UserProfile;

export async function setupAccount(input: SetupAccountInput): Promise<SetupAccountOutput> {
    const { userProfile, userProfileRef } = await getUserProfile({ userId: input.userId });

    let avatarUrl = "";
    if (input.avatarImg) {
        const avatarRef = ref(storage, `files/users/${input.userId}/avatar/avatar.jpeg`);
        const result = await uploadBytes(avatarRef, input.avatarImg);
        const downloadUrl = await getDownloadURL(result.ref);
        avatarUrl = downloadUrl;
    }

    delete input.userId;
    delete input.avatarImg;

    const result: SetupAccountOutput = {
        ...userProfile, ...input, avatarUrl, isAccountSetup: true
    }

    await updateEntity(userProfileRef, result);
    return result;
}
