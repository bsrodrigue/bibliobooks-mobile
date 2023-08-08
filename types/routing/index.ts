import { UserProfile } from "../auth";
import { Chapter, Novel, ReaderNovel, WorkshopNovel } from "../models";

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
    Search: any;
    NovelWorkshop: any;
    Settings: any;
    ChangeEmail: any;
    ChangePassword: any;
    ChapterPreview: {
        chapter: Chapter;
    };
    ChapterWorkshop: {
        novelId: string;
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
        novel: WorkshopNovel;
    };
    NovelDetails: {
        novel?: ReaderNovel;
    };
    RegisterSuccess: {
        token: string;
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