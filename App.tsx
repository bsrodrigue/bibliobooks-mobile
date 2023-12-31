import { ThemeProvider } from "@rneui/themed";
import { decode } from "base-64";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { useCachedResources } from "./src/hooks";
import RootStackNavigator from "./src/navigator";
import { SessionProvider } from "./src/providers";
import { lightTheme } from "./src/themes";

if (typeof atob === 'undefined') {
  global.atob = decode;
}

export default function App() {
  const { isLoadingComplete, session, onboarding } = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  }

  return (
    <ThemeProvider theme={lightTheme}>
      <SafeAreaView style={{ flex: 1, backgroundColor: "transparent" }}>
        <StatusBar backgroundColor="white" />
        <SessionProvider initialSession={session}>
          <RootStackNavigator skipOnboarding={Boolean(onboarding)} />
        </SessionProvider>
        <Toast />
      </SafeAreaView>
    </ThemeProvider>
  );
}