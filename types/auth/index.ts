export type UserProfile = {
    id: string;
    email: string;
    avatarUrl?: string;
    firstName?: string;
    lastName?: string;
    birthdate?: Date;
    pseudo?: string;
    bio?: string;
    favouriteGenres?: Array<string>;
    gender?: "male" | "female";
    isAccountSetup: boolean;
    library?: Array<string>;
    userId?: string;
};

export type UserSession = {
    userProfile: UserProfile;
}