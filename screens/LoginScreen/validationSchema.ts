import { object, string } from "yup";

export const loginSchema = object({
    email: string().email().required(),
    password: string().required(),
});
