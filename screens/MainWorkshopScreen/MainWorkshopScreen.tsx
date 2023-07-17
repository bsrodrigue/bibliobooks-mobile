import { NativeStackScreenProps, createNativeStackNavigator } from "@react-navigation/native-stack";
import { View } from "react-native";
import { RootStackParamList } from "../../types";
import { ChapterWorkshopScreen } from "../ChapterWorkshopScreen";
import { NovelFormScreen } from "../NovelFormScreen";
import { NovelWorkshopScreen } from "../NovelWorkshopScreen";

type MainWorkshopScreenProps = NativeStackScreenProps<RootStackParamList, 'Workshop'>;

const Stack = createNativeStackNavigator();

export default function MainWorkshopScreen({ navigation }: MainWorkshopScreenProps) {

    return (
        <View style={{ flex: 1 }}>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name='NovelWorkshop' component={NovelWorkshopScreen} />
                <Stack.Screen name='NovelForm' component={NovelFormScreen} />
                <Stack.Screen name='ChapterWorkshop' component={ChapterWorkshopScreen} />
            </Stack.Navigator>
        </View>
    )
}