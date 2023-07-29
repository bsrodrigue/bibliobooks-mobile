import { UserProfile } from "../auth";
import { Chapter, Novel, ReaderNovel } from "../models";

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
    Settings: any;
    ChangeEmail: any;
    ChangePassword: any;
    ChapterWorkshop: {
        novel: Novel;
    };
    Account: {
        novel?: ReaderNovel;
    };
    NovelForm: {
        mode: "create" | "edit",
        novel?: Novel;
    };
    ChapterForm: {
        mode: "create" | "edit",
        chapter?: Chapter;
        novel: Novel;
    };
    NovelDetails: {
        novel?: ReaderNovel;
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
    Reader: {
        novel: ReaderNovel;
        chapter: Chapter;
    }
};