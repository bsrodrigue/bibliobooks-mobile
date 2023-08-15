export type UserProfile = {
    id: number;
    avatarUrl?: string;
    email: string;
    firstName: string;
    lastName: string;
    birthdate: string;
    username: string;
    bio: string;
    favouriteGenres?: Array<string>;
    gender: "MALE" | "FEMALE";
    isAccountSetup: boolean;
    creations?: {
        id: number;
        title: string;
    }[]
};

export type Session = {
    token?: string;
    profile?: UserProfile;
};