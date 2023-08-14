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
};

export type Session = {
    token?: string;
    profile?: UserProfile;
};