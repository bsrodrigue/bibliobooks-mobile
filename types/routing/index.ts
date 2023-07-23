import { Chapter, Novel } from "..";

export type RootStackParamList = {
    Home;
    Onboarding;
    Login;
    Register;
    ForgotPassword;
    SetupAccount;
    Discover;
    Main;
    Novelty;
    Genre;
    Library;
    Workshop;
    Publications;
    Chapters;
    NovelWorkshop;
    ChapterWorkshop;
    Account;
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
    Success: {
        title: string;
        subtitle: string;
        confirm: string;
        destination: "Login" | "SetupAccount" | "Main";
    };
};