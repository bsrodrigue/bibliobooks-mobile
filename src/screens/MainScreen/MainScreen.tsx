import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Dialog, Icon } from "@rneui/base";
import { useTheme } from "@rneui/themed";
import { ReactNode, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Header } from "../../components";
import { useSession } from "../../providers";
import { RootStackParamList } from "../../types";
import { AccountScreen } from "../AccountScreen";
import { DiscoverScreen } from "../DiscoverScreen";
import { LibraryScreen } from "../LibraryScreen";
import { MainWorkshopScreen } from "../MainWorkshopScreen";
import { SearchScreen } from "../SearchScreen";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E8E8E8",
    },
});

type MainScreenProps = NativeStackScreenProps<RootStackParamList, 'Main'>;

type SimpleHeaderProps = {
    label?: string;
    rightIcon?: ReactNode;
}

function SimpleHeader({ label, rightIcon }: SimpleHeaderProps) {
    return (
        <View style={{
            backgroundColor: "white", paddingVertical: 15, paddingHorizontal: 25,
            flexDirection: "row", justifyContent: "space-between", alignItems: "center"
        }}>
            <Text style={{
                fontFamily: "Quicksand-700",
                fontSize: 25,
            }} >{label}</Text>
            <>{rightIcon}</>
        </View>
    )
}

const Tab = createBottomTabNavigator();

export default function MainScreen({ navigation, route }: MainScreenProps) {
    const [logoutDialogIsvisible, setLogoutDialogIsVisible] = useState(false);
    const { theme: { colors: { primary } } } = useTheme();
    const { stopSession } = useSession();

    return (
        <View style={styles.container}>
            <Dialog
                style={{
                    backgroundColor: "white"
                }}
                onBackdropPress={() => setLogoutDialogIsVisible(false)}
                isVisible={logoutDialogIsvisible}>
                <Dialog.Title>
                    Voulez-vous vous déconnecter?
                </Dialog.Title>
                <Dialog.Actions>
                    <Dialog.Button title="Confirmer" onPress={() => stopSession()} />
                </Dialog.Actions>
            </Dialog>
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
                header: ({ route, options }) => {
                    return route.name === "Discover" ?
                        <Header
                            onSearchPress={() => navigation.navigate("Search")}
                            onPressSettings={() => navigation.navigate("Settings")} /> : <SimpleHeader
                            label={options.tabBarLabel.toString()}
                            rightIcon={route.name === "Account" ? (
                                <TouchableOpacity onPress={() => {
                                    setLogoutDialogIsVisible(true);
                                }}>
                                    <Icon size={20} name="logout" type="ant-design" />
                                </TouchableOpacity>
                            ) : null}
                        />
                }
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
                        headerShown: false,
                        tabBarLabel: "Recherche",
                        tabBarIcon: () => ((<Icon name="search" type="font-awesome-5" />)),
                        tabBarItemStyle: {
                            display: "none"
                        }
                    }}
                    name="Search"
                    component={SearchScreen} />
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
                    component={AccountScreen} />
            </Tab.Navigator>
        </View >
    )
}