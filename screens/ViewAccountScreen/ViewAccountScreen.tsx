import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Icon } from "@rneui/base";
import { Avatar, useTheme } from "@rneui/themed";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { getPublicAuthorNovels } from "../../api/novels";
import useCall from "../../api/useCall";
import { RecommendationCarousel } from "../../components";
import { RootStackParamList } from "../../types";

type AccountScreenProps = NativeStackScreenProps<RootStackParamList, 'ViewAccount'>;

export default function ViewAccountScreen({ navigation, route: { params: { user } } }: AccountScreenProps) {
    const { theme: { colors: { greyOutline, black, primary } } } = useTheme();
    const { id, firstName, lastName, username, avatarUrl, gender, bio, creations } = user;
    const [novels, setNovels] = useState([]);
    const { call, isLoading } = useCall(getPublicAuthorNovels, {
        onSuccess(result) {
            setNovels(result);
        },
    })

    useEffect(() => {
        call({ authorId: id });
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: black, justifyContent: "space-between" }}>
            <View
                style={{
                    alignItems: "center",
                    borderBottomLeftRadius: 25,
                    borderBottomRightRadius: 25,
                    backgroundColor: "white",
                    gap: 5, paddingBottom: 15
                }}>
                <Avatar
                    size={100}
                    rounded
                    containerStyle={{ backgroundColor: greyOutline, padding: 2 }}
                    source={{ uri: avatarUrl }}
                />
                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 5, gap: 5 }}>
                    <Text style={{ fontFamily: "Quicksand-700", fontSize: 25 }}>{firstName}</Text>
                    <Text style={{ fontFamily: "Quicksand-700", fontSize: 25 }}>{lastName}</Text>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                        <Icon type="font-awesome-5" name={gender === "MALE" ? "male" : "female"} />
                        <Text style={{ opacity: 0.5, fontStyle: "italic" }}>{gender === "MALE" ? "Homme" : "Femme"}</Text>
                    </View>
                </View>
                <View style={{ alignItems: "center" }}>
                    <Text style={{ fontFamily: "Quicksand-500", fontSize: 14 }}>@{username}</Text>
                </View>
            </View>
            <View style={{ paddingHorizontal: 10 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-around", paddingVertical: 10 }}>
                    <View style={{ alignItems: "center" }}>
                        <Text style={{ color: "white", fontFamily: "Quicksand-700", fontSize: 25 }}>{creations?.length || 0}</Text>
                        <Text style={{
                            color: "white", fontFamily: "Quicksand-600",
                            textTransform: "uppercase", fontSize: 15, opacity: 0.8
                        }}>Oeuvres</Text>
                    </View>
                    <View style={{ alignItems: "center" }}>
                        <Text style={{ color: "white", fontFamily: "Quicksand-700", fontSize: 25 }}>0</Text>
                        <Text style={{
                            color: "white", fontFamily: "Quicksand-600",
                            textTransform: "uppercase", fontSize: 15, opacity: 0.8
                        }}>Followers</Text>
                    </View>
                    <View style={{ alignItems: "center" }}>
                        <Text style={{ color: "white", fontFamily: "Quicksand-700", fontSize: 25 }}>0</Text>
                        <Text style={{
                            color: "white", fontFamily: "Quicksand-600",
                            textTransform: "uppercase", fontSize: 15, opacity: 0.8
                        }}>Follows</Text>
                    </View>
                </View>
            </View>
            <View style={{
                flex: 1, backgroundColor: "white",
                paddingHorizontal: 30, borderTopStartRadius: 25,
                borderTopEndRadius: 25, paddingVertical: 15,
                justifyContent: "space-between"
            }}>
                <Text style={{ textAlign: "left", fontFamily: "Quicksand-500" }}>{bio}</Text>
                <RecommendationCarousel
                    onPress={(novel) => {
                        navigation.replace("NovelDetails", { novel })
                    }}
                    novels={novels} title="Oeuvres"
                    loading={isLoading} />
            </View>
        </View>
    )
}