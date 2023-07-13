import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Icon } from "@rneui/base";
import { useTheme } from "@rneui/themed";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { TextInput } from "../../components";
import { RootStackParamList } from "../../types";
import { DiscoverScreen } from "../DiscoverScreen";
import { LibraryScreen } from "../LibraryScreen";
import { LoginScreen } from "../LoginScreen";
import { WorkshopScreen } from "../WorkshopScreen";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E8E8E8",
    },
});

type MainScreenProps = NativeStackScreenProps<RootStackParamList, 'Main'>;

const Tab = createBottomTabNavigator();

export default function MainScreen({ navigation, route }: MainScreenProps) {
    console.log(route)
    const { theme: { colors: { primary } } } = useTheme();
    return (
        <View style={styles.container}>
            <View style={{ backgroundColor: "white", flexDirection: "row", paddingVertical: 10, justifyContent: "space-between" }}>
                <TouchableOpacity>
                    <TextInput
                        disabled
                        inputContainerStyle={{
                            backgroundColor: "#F5F5F5",
                            borderBottomWidth: 0,
                            borderRadius: 25,
                            paddingHorizontal: 15,
                        }}
                        containerStyle={{
                            width: 250
                        }}
                        placeholder="Rechercher des histoires"
                        leftIcon={<Icon type="font-awesome-5" name="search" />}
                        leftIconContainerStyle={{ marginRight: 10, opacity: 0.8 }}
                    />
                </TouchableOpacity>
                <View style={{ flexDirection: "row", alignItems: "center", marginRight: 15, gap: 15 }}>
                    <TouchableOpacity>
                        <Icon type="font-awesome-5" name="cog" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Icon type="font-awesome-5" name="bell" />
                    </TouchableOpacity>
                </View>
            </View>


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
                headerShown: false,
            }}>
                <Tab.Screen
                    options={{
                        tabBarLabel: "Découverte",
                        tabBarIcon: () => ((<Icon name="compass" type="font-awesome-5" />)),
                        headerTitle: "Découverte",
                    }}
                    name="Discover"
                    component={DiscoverScreen} />
                <Tab.Screen
                    options={{
                        tabBarLabel: "Bibliothèque",
                        tabBarIcon: () => ((<Icon name="book" type="font-awesome-5" />)),
                        headerTitle: "Bibliothèque"
                    }}
                    name="Library"
                    component={LibraryScreen} />
                <Tab.Screen
                    options={{
                        tabBarLabel: "Atelier",
                        tabBarIcon: () => ((<Icon name="pen" type="font-awesome-5" />)),
                        headerTitle: "Atelier"
                    }}
                    name="Workshop"
                    component={WorkshopScreen} />
                <Tab.Screen
                    options={{
                        tabBarLabel: "Compte",
                        tabBarIcon: () => ((<Icon name="user" type="font-awesome-5" />)),
                        headerTitle: "Compte"
                    }}
                    name="Account"
                    component={LoginScreen} />
            </Tab.Navigator>
        </View>
    )
}