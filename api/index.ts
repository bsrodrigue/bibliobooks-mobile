import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export type LoginInput = {
    email: string;
    password: string;
}

export async function login({ email, password }: LoginInput) {
    return await signInWithEmailAndPassword(auth, email, password);
}

export type RegisterInput = {
    email: string;
    password: string;
}

export async function register({ email, password }: RegisterInput) {
    return await createUserWithEmailAndPassword(auth, email, password);
}
