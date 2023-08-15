import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SuccessScreenComponent } from "../../components";
import { useSession } from "../../providers";
import { RootStackParamList } from "../../types";

type SuccessScreenProps = NativeStackScreenProps<RootStackParamList, 'SetupAccountSuccess'>;

export default function SuccessScreen({ route: { params: { userProfile } }, navigation }: SuccessScreenProps) {
    const { updateSession } = useSession();

    const onPress = () => {
        updateSession({ profile: userProfile })
        navigation.replace("Main");
    }

    return (
        <SuccessScreenComponent onPress={onPress} />
    )
}