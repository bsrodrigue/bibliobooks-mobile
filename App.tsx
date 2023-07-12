import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemeProvider, createTheme } from "@rneui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCachedResources } from "./hooks";
import { ForgotPasswordScreen, LoginScreen, MainScreen, RegisterScreen, SetupAccountScreen, SuccessScreen } from "./screens";
import NovelDetailsScreen from "./screens/NovelDetails/NovelDetails";
import OnboardingScreen from './screens/OnboardingScreen/OnboardingScreen';

const lightTheme = createTheme({
  lightColors: {
    primary: "#22A39F",
    black: "#0A514F",
    error: "#DF2E38",
    greyOutline: "#CCCCCC",
  },
  darkColors: {
    primary: "#22A39F",
    error: "#DF2E38",
    greyOutline: "#CCCCCC",
  },
  components: {
    Text: {
      style: {
        fontFamily: "Quicksand-500"
      }
    },

    Button: {
      titleStyle: {
        fontFamily: "Quicksand-500"
      }
    }
  }
})

const Stack = createNativeStackNavigator();

export default function App() {
  const { isLoadingComplete } = useCachedResources();

  const isFirstBoot = false;
  const isAuth = true;
  const isAccountSetup = true;

  if (!isLoadingComplete) {
    return null;
  }

  return (
    <ThemeProvider theme={lightTheme}>
      <SafeAreaView style={{ flex: 1, backgroundColor: "transparent" }}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {isFirstBoot ? (<Stack.Screen name='Onboarding' component={OnboardingScreen} />) : null}
            <Stack.Screen name='Main' component={MainScreen} />
            <Stack.Screen name='NovelDetails' component={NovelDetailsScreen} />
            {!isAccountSetup ? (<Stack.Screen name='SetupAccount' component={SetupAccountScreen} />) : null}
            {!isAuth ? (<>
              <Stack.Screen name='Login' component={LoginScreen} />
              <Stack.Screen name='Register' component={RegisterScreen} />
              <Stack.Screen name='ForgotPassword' component={ForgotPasswordScreen} />
            </>) : null}
            <Stack.Screen name='Success' component={SuccessScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </ThemeProvider>
  );
}