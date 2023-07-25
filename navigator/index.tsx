import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSession } from "../providers";
import { ForgotPasswordScreen, LoginScreen, MainScreen, OnboardingScreen, RegisterScreen, RegisterSuccessScreen, SetupAccountScreen, SuccessScreen } from "../screens";
import NovelDetailsScreen from "../screens/NovelDetails/NovelDetails";
import { UserSession } from "../types/auth";

const Stack = createNativeStackNavigator();

type PublicStackProps = {
    skipOnboarding: boolean;
};

function PublicStack({ skipOnboarding }: PublicStackProps) {
    const initialRouteName = skipOnboarding ? "Login" : "Onboarding";

    return (
        <Stack.Navigator initialRouteName={initialRouteName} screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Onboarding' component={OnboardingScreen} />
            <Stack.Screen name='Login' component={LoginScreen} />
            <Stack.Screen name='Register' component={RegisterScreen} />
            <Stack.Screen name='ForgotPassword' component={ForgotPasswordScreen} />
            <Stack.Screen name='RegisterSuccess' component={RegisterSuccessScreen} />
        </Stack.Navigator>
    )
}

type PrivateStackProps = {
    session: UserSession;
};

function PrivateStack({ session }: PrivateStackProps) {
    const initialRouteName = !session.userProfile.isAccountSetup ? "SetupAccount" : "Main";
    return (
        <Stack.Navigator initialRouteName={initialRouteName} screenOptions={{ headerShown: false }}>
            <Stack.Screen name='SetupAccount' component={SetupAccountScreen} />
            <Stack.Screen name='Main' component={MainScreen} />
            <Stack.Screen name='NovelDetails' component={NovelDetailsScreen} />
            <Stack.Screen name='Success' component={SuccessScreen} />
        </Stack.Navigator>
    )
}

type RootStackNavigatorProps = {
    skipOnboarding: boolean;
}

export default function RootStackNavigator({ skipOnboarding }: RootStackNavigatorProps) {
    const { session } = useSession();

    return (
        <NavigationContainer>
            {session ? (<PrivateStack session={session} />) : (<PublicStack skipOnboarding={skipOnboarding} />)}
        </NavigationContainer>
    )
}

