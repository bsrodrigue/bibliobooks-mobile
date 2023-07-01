import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Ref, useRef, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Button, OnboardingItem } from "../../components";
import { RootStackParamList, Slide } from "../../types";


const slides: Slide[] = [
    {
        id: '1',
        title: "Ecrivez",
        description: 'Libérez votre créativité et donnez naissance à des histoires formidables que vous partagerez avec une communauté nombreuse',
        image: require('../../assets/illustrations/onboarding1.png')
    },
    {
        id: '2',
        title: "Lisez",
        description: 'Découvrez des tonnes d’histoires de genres différents! De l’aventure, de l’action, de la fantaisie et bien plus encore',
        image: require('../../assets/illustrations/onboarding2.png')
    },
    {
        id: '3',
        title: "Partagez",
        description: 'Libérez votre créativité et donnez naissance à des histoires formidables que vous partagerez avec une communauté nombreuse',
        image: require('../../assets/illustrations/onboarding3.png'),
        nextTitle: "Terminer"
    },
]

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        paddingVertical: 20,
    },

    header: {
        flex: 0.3,
    },

    body: {
        flex: 0.5,

    },

    footer: {
        flex: 0.2,
        justifyContent: "flex-end",
        gap: 15,
        paddingHorizontal: 40,
    },

    next: {
        fontSize: 20,
        fontFamily: "Quicksand-700"
    },

    skip: {
        color: "black",
        fontFamily: "Quicksand-600",
    }
});


type OnboardingScreenProps = NativeStackScreenProps<RootStackParamList, 'Onboarding'>;

export default function OnboardingScreen({ navigation }: OnboardingScreenProps) {
    const slideRef: Ref<FlatList> = useRef(null);
    const [index, setIndex] = useState(0);

    const isLastSlide = index === slides.length - 1;

    const scrollToNext = () => {
        if (!isLastSlide) {
            slideRef.current.scrollToIndex({
                index: index + 1,
                animated: true
            });
            return;
        }

        navigation.navigate("Login")
    }

    const viewableItemsChanged = useRef(({ viewableItems }) => {
        setIndex(viewableItems[0].index);
    }).current;

    return (
        <View style={styles.container}>
            <View style={styles.header}></View>
            <View style={styles.body}>
                <FlatList
                    ref={slideRef}
                    showsHorizontalScrollIndicator={false}
                    horizontal pagingEnabled
                    data={slides}
                    onViewableItemsChanged={viewableItemsChanged}
                    renderItem={(item) => (<OnboardingItem
                        {...item} />)} />
            </View>
            <View style={styles.footer}>
                <Button
                    title={"Suivant"}
                    titleStyle={styles.next}
                    color="black"
                    size="lg"
                    radius={5}
                    onPress={scrollToNext}
                />
                <Button title="Ignorer"
                    titleStyle={styles.skip}
                    type="clear" />
            </View>
        </View>
    )
}