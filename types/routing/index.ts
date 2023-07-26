import { Chapter, Novel } from "..";
import { UserProfile } from "../auth";

export type RootStackParamList = {
    Home: any;
    Onboarding: any;
    Login: any;
    Register: any;
    ForgotPassword: any;
    SetupAccount: any;
    Discover: any;
    Main: any;
    Novelty: any;
    Genre: any;
    Library: any;
    Workshop: any;
    Publications: any;
    Chapters: any;
    NovelWorkshop: any;
    ChapterWorkshop: any;
    Account: any;
    NovelForm: {
        mode: "create" | "edit",
        novel?: Novel;
    };
    ChapterForm: {
        mode: "create" | "edit",
        chapter?: Chapter;
    };
    NovelDetails: {
        novel: Novel;
    };
    RegisterSuccess: {
        userProfile: UserProfile;
    };
    SetupAccountSuccess: {
        userProfile: UserProfile;
    };
    Success: {
        title: string;
        subtitle: string;
        confirm: string;
        destination: "Login" | "SetupAccount" | "Main";
    };
};