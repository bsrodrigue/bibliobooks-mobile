import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SuccessScreenComponent } from "../../components";
import { getJwtUser } from "../../lib/jwt";
import { useSession } from "../../providers";
import { RootStackParamList } from "../../types";

type SuccessScreenProps = NativeStackScreenProps<RootStackParamList, 'RegisterSuccess'>;

export default function SuccessScreen({ route: { params: { token } } }: SuccessScreenProps) {
    const { updateSession } = useSession();

    const onPress = () => {
        const profile = getJwtUser(token);
        updateSession({ token, profile });
    }

    return (
        <SuccessScreenComponent onPress={onPress} />
    )
}