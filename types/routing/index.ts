export type RootStackParamList = {
    Home;
    Onboarding;
    Login;
    Register;
    ForgotPassword;
    SetupAccount;
    Discover;
    Success: {
        title: string;
        subtitle: string;
        confirm: string;
        destination: "Login" | "SetupAccount" | "Home";
    };
};