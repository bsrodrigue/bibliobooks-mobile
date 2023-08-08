import { UserProfile } from "../../types/auth";
import { uploadFile } from "../base";
import client from "../client";

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
    gender: "male" | "female";
    avatarImg?: File | Blob;
    favouriteGenres?: Array<string>;
}

export async function setupAccount({ avatarImg, ...input }: SetupAccountInput): Promise<any> {
    let avatarUrl = "";
    if (avatarImg) {
        avatarUrl = await uploadFile(avatarImg);
    }

    const result = await client.post("auth/setupAccount", { avatarUrl, ...input });
    return result.data;
}

export type UpdateUserProfile = {
    userId: string;
    profile: Partial<UserProfile>;
    avatarImg?: Blob | File;
}

export async function updateUserProfile({ userId, profile, avatarImg }: UpdateUserProfile) {
    return ""
}