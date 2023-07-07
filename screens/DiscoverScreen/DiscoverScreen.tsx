import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, View } from "react-native";
import { RootStackParamList } from "../../types";
import { HomeScreen } from "../HomeScreen";
import { useTheme } from "@rneui/themed";


const Tab = createBottomTabNavigator();

type DiscoverScreenProps = NativeStackScreenProps<RootStackParamList, 'Discover'>;

export default function DiscoverScreen({ navigation }: DiscoverScreenProps) {
    const { theme: { colors: { primary } } } = useTheme();

    return (
        <View style={{ flex: 1 }}>
            <Tab.Navigator
                sceneContainerStyle={{
                    paddingTop: 30
                }}
                screenOptions={{
                    headerShown: false,
                    tabBarStyle: {
                        position: "absolute",
                        top: 0,
                        height: 30
                    },
                    tabBarIconStyle: {
                        display: "none"
                    },

                    tabBarActiveTintColor: primary,
                    tabBarLabel: ({ focused, children }) => (
                        <View style={{ alignItems: "center" }}>
                            <Text style={{
                                fontSize: 14,
                                fontFamily: "Quicksand-700",
                                color: focused ? primary : "black",
                                paddingVertical: 5
                            }}>{children}</Text>
                            {focused ? (<View style={{ width: 20, height: 5, backgroundColor: primary, borderRadius: 25 }}></View>) : null}
                        </View>
                    )
                }}>
                <Tab.Screen component={HomeScreen} name="Home" options={{ title: "Découverte" }} />
                <Tab.Screen component={HomeScreen} name="Nouveaux" options={{ title: "Nouveautés" }} />
                <Tab.Screen component={HomeScreen} name="Genres" options={{ title: "Catégories" }} />
            </Tab.Navigator>
        </View>
    )
}