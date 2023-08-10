import { ThemeProvider } from "@rneui/themed";
import { decode } from "base-64";
import { KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { useCachedResources } from "./hooks";
import RootStackNavigator from "./navigator";
import { SessionProvider } from "./providers";
import { lightTheme } from "./themes";

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
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios"
          ? "padding"
          : "height"}>
          <SessionProvider initialSession={session}>
            <RootStackNavigator skipOnboarding={Boolean(onboarding)} />
          </SessionProvider>
          <Toast />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ThemeProvider>
  );
}