import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { getPublicAuthorNovels } from "../../api/novels";
import useCall from "../../api/useCall";
import { AccountView, RecommendationCarousel } from "../../components";
import { RootStackParamList } from "../../types";

type AccountScreenProps = NativeStackScreenProps<RootStackParamList, 'ViewAccount'>;

export default function ViewAccountScreen({ navigation, route: { params: { user } } }: AccountScreenProps) {
    const [novels, setNovels] = useState([]);
    const { call, isLoading } = useCall(getPublicAuthorNovels, {
        onSuccess(result) {
            setNovels(result);
        },
    })

    useEffect(() => {
        call({ authorId: user.id });
    }, []);

    return (
        <AccountView user={user}>
            <RecommendationCarousel
                onPress={(novel) => {
                    navigation.replace("NovelDetails", { novel })
                }}
                novels={novels} title="Oeuvres"
                loading={isLoading} />
        </AccountView>
    )
}