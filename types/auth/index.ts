export type UserProfile = {
    firstName: string;
    lastName: string;
    birthdate: Date;
    pseudo: string;
    bio: string;
    favouriteGenres: Array<string>;
    gender: "male" | "female";
    accountIsSetup: boolean;
}; 
