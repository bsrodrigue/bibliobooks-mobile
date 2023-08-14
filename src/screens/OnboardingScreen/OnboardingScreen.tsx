import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Ref, useRef, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { Button, OnboardingItem } from "../../components";
import { useAsyncStorage } from "../../lib/storage";
import { RootStackParamList } from "../../types";
import { slides } from "./slides";
import { useOnboardingStyles } from "./useOnboardingStyles";

type OnboardingScreenProps = NativeStackScreenProps<RootStackParamList, 'Onboarding'>;

export default function OnboardingScreen({ navigation }: OnboardingScreenProps) {
    const slideRef: Ref<FlatList> = useRef(null);
    const { storeData } = useAsyncStorage();
    const [index, setIndex] = useState(0);
    const isLastSlide = index === slides.length - 1;
    const styles = useOnboardingStyles();

    const goToLoginScreen = async () => {
        await storeData("onboarding", { seen: true });
        navigation.navigate("Login")
    }

    const scrollToNext = () => {
        if (!isLastSlide) {
            slideRef.current.scrollToIndex({
                index: index + 1,
                animated: true
            });
            return;
        }

        goToLoginScreen();
    }

    const viewableItemsChanged = useRef(({ viewableItems }) => {
        setIndex(viewableItems[0].index);
    }).current;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Bibliobooks</Text>
            </View>
            <View style={styles.body}>
                <FlatList
                    ref={slideRef}
                    showsHorizontalScrollIndicator={false}
                    horizontal pagingEnabled
                    data={slides}
                    onViewableItemsChanged={viewableItemsChanged}
                    renderItem={(item) => (<OnboardingItem {...item} />)} />
            </View>
            <View style={styles.footer}>
                <Button title={"Suivant"}
                    titleStyle={styles.next}
                    color="black" size="lg"
                    radius={5} onPress={scrollToNext} />
                <Button title="Ignorer"
                    titleStyle={styles.skip}
                    onPress={goToLoginScreen}
                    type="clear" />
            </View>
        </View>
    )
}