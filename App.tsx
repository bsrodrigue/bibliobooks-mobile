import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ThemeProvider } from "@rneui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import "./firebase";
import { useCachedResources } from "./hooks";
import { SessionProvider } from "./providers";
import { ForgotPasswordScreen, LoginScreen, MainScreen, OnboardingScreen, RegisterScreen, SetupAccountScreen, SuccessScreen } from "./screens";
import NovelDetailsScreen from "./screens/NovelDetails/NovelDetails";
import { lightTheme } from "./themes";

const Stack = createNativeStackNavigator();

type AuthNavigatorProps = {
  onboarding?: object;
};

function PublicStack({ onboarding }: AuthNavigatorProps) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {
        !onboarding ? (
          <Stack.Screen name='Onboarding' component={OnboardingScreen} />
        ) : null
      }
      <Stack.Screen name='Login' component={LoginScreen} />
      <Stack.Screen name='Register' component={RegisterScreen} />
      <Stack.Screen name='ForgotPassword' component={ForgotPasswordScreen} />
    </Stack.Navigator>
  )
}

function PrivateStack() {
  return (
    <>
      <Stack.Screen name='SetupAccount' component={SetupAccountScreen} />
      <Stack.Screen name='Main' component={MainScreen} />
      <Stack.Screen name='NovelDetails' component={NovelDetailsScreen} />
    </>
  )
}

export default function App() {
  const { isLoadingComplete, session, onboarding } = useCachedResources();
  AsyncStorage.clear();

  if (!isLoadingComplete) {
    return null;
  }

  return (
    <ThemeProvider theme={lightTheme}>
      <SafeAreaView style={{ flex: 1, backgroundColor: "transparent" }}>
        <SessionProvider creds={session}>
          <NavigationContainer>
            <PublicStack onboarding={onboarding} />
            <PrivateStack />
            <Stack.Screen name='Success' component={SuccessScreen} />
          </NavigationContainer>
        </SessionProvider>
        <Toast />
      </SafeAreaView>
    </ThemeProvider>
  );
}