import { UserProfile } from "../../types/auth";
import { uploadFile } from "../base";
import client from "../client";

//TODO: Type Request Responses

export type RegisterInput = {
    email: string;
    password: string;
};

export async function register({ email, password }: RegisterInput): Promise<string> {
    const result = await client.post("auth/register", { email, password });
    return result.data["access_token"];
}

export type LoginInput = RegisterInput;

export async function login({ email, password }: LoginInput): Promise<string> {
    const result = await client.post("auth/login", { email, password });
    return result.data["access_token"];
}

export type SetupAccountInput = {
    firstName: string;
    lastName: string;
    birthdate: string;
    username: string;
    bio?: string;
    gender: "MALE" | "FEMALE";
    avatarImg?: File | Blob;
    favouriteGenres?: Array<string>;
}

export async function setupAccount({ avatarImg, ...payload }: SetupAccountInput): Promise<any> {
    let avatarUrl = "";
    if (avatarImg) {
        avatarUrl = await uploadFile(avatarImg);
    }

    const result = await client.post("users/me/setupAccount", { avatarUrl, ...payload });
    return result.data.user;
}

export type UpdateUserProfile = {
    profile: Partial<UserProfile>;
    avatarImg?: Blob | File;
}

export async function updateUserProfile({ profile, avatarImg }: UpdateUserProfile) {
    let avatarUrl = "";
    if (avatarImg) {
        avatarUrl = await uploadFile(avatarImg);
    }

    const result = await client.post("users/me/updateUserProfile", { avatarUrl, ...profile });
    return result.data.user;
}

export async function getUserProfile({ }) {
    const result = await client.get("auth/getUserProfile");
    return result.data
}