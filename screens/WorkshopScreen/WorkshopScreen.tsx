import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useTheme } from "@rneui/themed";
import { Text, View } from "react-native";
import { RootStackParamList } from "../../types";
import { GenreScreen } from "../GenreScreen";
import { NoveltyScreen } from "../NoveltyScreen";
import { PublicationsScreen } from "../PublicationsScreen";

const Tab = createBottomTabNavigator();

type WorkshopScreenProps = NativeStackScreenProps<RootStackParamList, 'Workshop'>;

export default function WorkshopScreen({ navigation }: WorkshopScreenProps) {
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
                <Tab.Screen component={PublicationsScreen} name="Publications" options={{ title: "Publications" }} />
                <Tab.Screen component={NoveltyScreen} name="Drafts" options={{ title: "Brouillons" }} />
                <Tab.Screen component={GenreScreen} name="Archives" options={{ title: "Archives" }} />
            </Tab.Navigator>
        </View>
    )
}