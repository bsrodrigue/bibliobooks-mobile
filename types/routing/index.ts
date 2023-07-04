export type RootStackParamList = {
    Onboarding;
    Login;
    Register;
    ForgotPassword;
    Success: {
        title: string,
        subtitle: string,
        confirm: string,
        onConfirm: () => void,
    };
};