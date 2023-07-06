import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View } from "react-native";
import { RootStackParamList } from "../../types";

type DiscoverScreenProps = NativeStackScreenProps<RootStackParamList, 'Discover'>;

export default function DiscoverScreen({ navigation }: DiscoverScreenProps) {

    return (
        <View></View>
    )
}