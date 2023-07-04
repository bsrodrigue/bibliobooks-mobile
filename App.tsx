import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useCachedResources } from "./hooks";
import OnboardingScreen from './screens/OnboardingScreen/OnboardingScreen';
import { ThemeProvider, createTheme } from "@rneui/themed";
import { LoginScreen, RegisterScreen } from "./screens";
import { SafeAreaView } from "react-native-safe-area-context";

const theme = createTheme({
  components: {
    Text: {
      style: {
        fontFamily: "Quicksand"
      }
    },

    Button: {
      titleStyle: {
        fontFamily: "Quicksand"
      }
    }
  }
})

const Stack = createNativeStackNavigator();

export default function App() {
  const { isLoadingComplete } = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <SafeAreaView style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Onboarding' component={OnboardingScreen} />
            <Stack.Screen name='Login' component={LoginScreen} />
            <Stack.Screen name='Register' component={RegisterScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </ThemeProvider>
  );
}