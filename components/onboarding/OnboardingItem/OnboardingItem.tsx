import { Image, StyleSheet, Text, View, useWindowDimensions } from "react-native";
import { Slide } from "../../../types";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 40,
    },

    image: {
        flex: 0.5,
        marginBottom: 10,
    },

    title: {
        textAlign: "center",
        fontSize: 40,
        fontFamily: "Quicksand-700",
        marginVertical: 10
    },

    description: {
        opacity: 0.5,
        fontSize: 16,
        textAlign: "center",
        fontFamily: "Quicksand-600"
    },


});

type OnboardingItemProps = {
    item: Slide;
}

export default function OnboardingItem({ item }: OnboardingItemProps) {
    const { width } = useWindowDimensions();

    return (
        <View style={[styles.container, { width }]}>
            <Image source={item.image} style={[styles.image, { width: width - 100, resizeMode: 'contain' }]} />
            <View style={{ flex: 0.5 }}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
            </View>
            <View />
        </View>
    )

}