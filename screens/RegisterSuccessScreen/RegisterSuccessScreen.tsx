import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Image, Text, View } from "react-native";
import { Button } from "../../components";
import { useSession } from "../../providers";
import { RootStackParamList } from "../../types";
import { styles } from "./styles";

type SuccessScreenProps = NativeStackScreenProps<RootStackParamList, 'RegisterSuccess'>;

export default function SuccessScreen({ route: { params: { token } } }: SuccessScreenProps) {
    const dimension = 165
    const { updateSession } = useSession();

    const initSession = async () => {
        await updateSession({ token });
    }

    return (
        <View style={styles.container}>
            <Image style={{
                width: dimension,
                height: dimension
            }} source={require("../../assets/illustrations/party.png")} />
            <View>
                <Text style={styles.title}>Félicitations</Text>
                <Text style={styles.subtitle}>Votre inscription s'est bien déroulée! Veuillez à présent configurer votre compte pour profiter de la plateforme</Text>
            </View>
            <Button
                onPress={initSession}
                buttonStyle={{ backgroundColor: "white" }}
                titleStyle={styles.confirm}>D'accord</Button>
        </View>
    )
}