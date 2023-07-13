import { Novel } from "..";

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
    WorkshopChapters;
    NovelDetails: {
        novel: Novel;
    };
    Success: {
        title: string;
        subtitle: string;
        confirm: string;
        destination: "Login" | "SetupAccount" | "Home";
    };
};