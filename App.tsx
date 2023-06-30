import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useCachedResources } from "./hooks";
import OnboardingScreen from './screens/OnboardingScreen/OnboardingScreen';
import { ThemeProvider, createTheme } from "@rneui/themed";
import { LoginScreen } from "./screens";

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
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name='Onboarding' component={OnboardingScreen} />
          <Stack.Screen name='Login' component={LoginScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}