import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSession } from "../providers";
import { ForgotPasswordScreen, LoginScreen, MainScreen, OnboardingScreen, RegisterScreen, SetupAccountScreen, SuccessScreen } from "../screens";
import NovelDetailsScreen from "../screens/NovelDetails/NovelDetails";

const Stack = createNativeStackNavigator();

type PublicStackProps = {};

function PublicStack({ }: PublicStackProps) {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Onboarding' component={OnboardingScreen} />
            <Stack.Screen name='Login' component={LoginScreen} />
            <Stack.Screen name='Register' component={RegisterScreen} />
            <Stack.Screen name='ForgotPassword' component={ForgotPasswordScreen} />
        </Stack.Navigator>
    )
}

type PrivateStackProps = {};

function PrivateStack({ }: PrivateStackProps) {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='SetupAccount' component={SetupAccountScreen} />
            <Stack.Screen name='Main' component={MainScreen} />
            <Stack.Screen name='NovelDetails' component={NovelDetailsScreen} />
            <Stack.Screen name='Success' component={SuccessScreen} />
        </Stack.Navigator>
    )
}

type RootStackNavigatorProps = {
    onboarding: object;
    setup: object;
}

export default function RootStackNavigator({ onboarding, setup }: RootStackNavigatorProps) {
    const { session } = useSession();

    return (
        <NavigationContainer>
            {session ? (<PrivateStack />) : (<PublicStack />)}
        </NavigationContainer>
    )
}

