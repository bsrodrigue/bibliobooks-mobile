import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Icon } from "@rneui/base";
import { useTheme } from "@rneui/themed";
import { StyleSheet, View } from "react-native";
import { Header } from "../../components";
import { RootStackParamList } from "../../types";
import { DiscoverScreen } from "../DiscoverScreen";
import { LibraryScreen } from "../LibraryScreen";
import { LoginScreen } from "../LoginScreen";
import { MainWorkshopScreen } from "../MainWorkshopScreen";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E8E8E8",
    },
});

type MainScreenProps = NativeStackScreenProps<RootStackParamList, 'Main'>;

const Tab = createBottomTabNavigator();

export default function MainScreen({ navigation, route }: MainScreenProps) {
    const { theme: { colors: { primary } } } = useTheme();

    return (
        <View style={styles.container}>
            <Tab.Navigator screenOptions={{
                tabBarStyle: {
                    paddingVertical: 10,
                    height: 60
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontFamily: "Quicksand-600",
                    marginBottom: 5
                },
                tabBarActiveTintColor: primary,
                header: () => (<Header />)
            }}>
                <Tab.Screen
                    options={{
                        tabBarLabel: "Découverte",
                        tabBarIcon: () => ((<Icon name="compass" type="font-awesome-5" />)),
                    }}
                    name="Discover"
                    component={DiscoverScreen} />
                <Tab.Screen
                    options={{
                        tabBarLabel: "Bibliothèque",
                        tabBarIcon: () => ((<Icon name="book" type="font-awesome-5" />)),
                    }}
                    name="Library"
                    component={LibraryScreen} />
                <Tab.Screen
                    options={{
                        tabBarLabel: "Atelier",
                        tabBarIcon: () => ((<Icon name="pen" type="font-awesome-5" />)),
                    }}
                    name="Workshop"
                    component={MainWorkshopScreen} />
                <Tab.Screen
                    options={{
                        tabBarLabel: "Compte",
                        tabBarIcon: () => ((<Icon name="user" type="font-awesome-5" />)),
                    }}
                    name="Account"
                    component={LoginScreen} />
            </Tab.Navigator>
        </View>
    )
}