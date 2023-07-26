import { CreateNovelInput } from "../../api/novels";
import { UserProfile } from "../auth";
import { Chapter, Novel } from "../models";

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
    ChapterWorkshop: {
        novel: Novel;
    };
    Account: any;
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
        novel?: CreateNovelInput;
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