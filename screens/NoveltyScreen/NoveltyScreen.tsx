import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useTheme } from "@rneui/themed";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { getPublicNovels } from "../../api/novels";
import useCall from "../../api/useCall";
import { NovelList } from "../../components";
import { RootStackParamList } from "../../types";
import { Novel } from "../../types/models";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        marginTop: 10,
        justifyContent: "center",
        alignItems: "center",
    },
});

type LibraryScreenProps = NativeStackScreenProps<RootStackParamList, 'Library'>;

export default function LibraryScreen({ navigation }: LibraryScreenProps) {
    const [novels, setNovels] = useState<Array<Novel>>([]);
    const { theme: { colors: { primary } } } = useTheme();
    const { call, isLoading } = useCall(getPublicNovels, {
        onSuccess(result) {
            setNovels(result);
        },
    });

    useEffect(() => {
        call({});
    }, []);

    return (
        <View style={styles.container}>
            {isLoading ?
                (
                    <ActivityIndicator color={primary} size="large" />
                ) : (
                    <NovelList novels={novels} onPressItem={() => { }} />
                )
            }
        </View>
    )
}