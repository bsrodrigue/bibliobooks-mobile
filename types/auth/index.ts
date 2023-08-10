export type UserProfile = {
    id: string;
    avatarUrl?: string;
    email: string;
    firstName: string;
    lastName: string;
    birthdate: string;
    pseudo: string;
    bio: string;
    favouriteGenres?: Array<string>;
    gender: "male" | "female";
    isAccountSetup: boolean;
};

export type Session = {
    token?: string;
    profile?: UserProfile;
};