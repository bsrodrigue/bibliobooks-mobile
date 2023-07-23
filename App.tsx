import { ThemeProvider } from "@rneui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import "./firebase";
import { useCachedResources } from "./hooks";
import RootStackNavigator from "./navigator";
import { SessionProvider } from "./providers";
import { lightTheme } from "./themes";

export default function App() {
  const { isLoadingComplete, session, setup, onboarding } = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  }

  return (
    <ThemeProvider theme={lightTheme}>
      <SafeAreaView style={{ flex: 1, backgroundColor: "transparent" }}>
        <SessionProvider creds={session}>
          <RootStackNavigator setup={setup} onboarding={onboarding} />
        </SessionProvider>
        <Toast />
      </SafeAreaView>
    </ThemeProvider>
  );
}