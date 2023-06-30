import { Text, FlatList, Image, ImageSourcePropType, StyleSheet, View, useWindowDimensions } from "react-native"
import Button from "../../components";
import { Ref, useRef, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Slide = { id: string; description: string, image: ImageSourcePropType; nextTitle?: string }

const slides: Slide[] = [
    {
        id: '1',
        description: 'Libérez votre créativité et donnez naissance à des histoires formidables que vous partagerez avec une communauté nombreuse',
        image: require('../../assets/illustrations/onboarding1.png')
    },
    {
        id: '2',
        description: 'Découvrez des tonnes d’histoires de genres différents! De l’aventure, de l’action, de la fantaisie et bien plus encore',
        image: require('../../assets/illustrations/onboarding2.png')
    },
    {
        id: '3',
        description: 'Libérez votre créativité et donnez naissance à des histoires formidables que vous partagerez avec une communauté nombreuse',
        image: require('../../assets/illustrations/onboarding3.png'),
        nextTitle: "Terminer"
    },
]

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    wrapper: {
        flex: 0.8,
        paddingHorizontal: 40,
        paddingVertical: 10,
    },

    header: {
        flex: 0.2
    },

    body: {
        flex: 0.8,
        justifyContent: "center",
        alignItems: 'center'
    },

    footer: {
        flex: 0.2,
        gap: 10
    },

    image: {
        flex: 0.7,
    },

    description: {
        opacity: 0.5,
        fontSize: 16,
        textAlign: "center",
        fontFamily: "Quicksand-600"
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

type OnboardingItemProps = {
    item: Slide;
    onNext?: () => void;
}

function OnboardingItem({ item, onNext }: OnboardingItemProps) {
    const { width } = useWindowDimensions();

    return (
        <View style={[styles.container, { width }]}>
            <View style={styles.header}>

            </View>
            <View style={styles.wrapper}>
                <View style={styles.body}>
                    <Image source={item.image} style={[styles.image, { width: width - 100, resizeMode: 'contain' }]} />
                    <View style={{ flex: 0.3 }}>
                        <Text style={styles.description}>{item.description}</Text>
                    </View>
                </View>
                <View style={styles.footer}>
                    <Button
                        title={item.nextTitle || "Suivant"}
                        titleStyle={styles.next}
                        color="black"
                        size="lg"
                        radius={5}
                        onPress={onNext}
                    />
                    <Button title="Ignorer"
                        titleStyle={styles.skip}
                        type="clear" />
                </View>
                <View />
            </View>
        </View>
    )

}

type RootStackParamList = {
    Onboarding;
    Login;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Onboarding'>;

export default function OnboardingScreen({ navigation }: Props) {
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
            <FlatList
                ref={slideRef}
                showsHorizontalScrollIndicator={false}
                horizontal pagingEnabled
                data={slides}
                onViewableItemsChanged={viewableItemsChanged}
                renderItem={(item) => (<OnboardingItem
                    onNext={scrollToNext}
                    {...item} />)} />
        </View>
    )
}