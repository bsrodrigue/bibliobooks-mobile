import { ThemeProvider } from "@rneui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { useCachedResources } from "./hooks";
import RootStackNavigator from "./navigator";
import { SessionProvider } from "./providers";
import { lightTheme } from "./themes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { decode } from "base-64";

if (typeof atob === 'undefined') {
  global.atob = decode;
}

export default function App() {
  const { isLoadingComplete, session, onboarding } = useCachedResources();
  // AsyncStorage.clear();

  if (!isLoadingComplete) {
    return null;
  }

  return (
    <ThemeProvider theme={lightTheme}>
      <SafeAreaView style={{ flex: 1, backgroundColor: "transparent" }}>
        <SessionProvider uSession={session}>
          <RootStackNavigator skipOnboarding={Boolean(onboarding)} />
        </SessionProvider>
        <Toast />
      </SafeAreaView>
    </ThemeProvider>
  );
}