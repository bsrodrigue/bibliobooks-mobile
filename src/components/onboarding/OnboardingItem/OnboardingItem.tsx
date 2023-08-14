import { Image, Text, View, useWindowDimensions } from "react-native";
import { Slide } from "../../../types";
import { useOnboardingItemStyles } from "./useOnboardingItemStyles";

type OnboardingItemProps = {
    item: Slide;
}

export default function OnboardingItem({ item }: OnboardingItemProps) {
    const { width } = useWindowDimensions();
    const styles = useOnboardingItemStyles();

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