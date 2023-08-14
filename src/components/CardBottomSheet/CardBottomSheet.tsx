import { BottomSheet, Card } from "@rneui/base";
import { ReactNode } from "react";
import { StyleSheet } from "react-native";

type CardBottomSheetProps = {
    isVisible?: boolean;
    onBackdropPress?: () => void;
    children?: ReactNode;
}

const styles = StyleSheet.create({
    bottomSheet: {
        margin: 0,
        borderTopStartRadius: 25,
        borderTopEndRadius: 25,
        flex: 1,
        paddingHorizontal: 10,
        justifyContent: "center",
        alignItems: "center",
    }
});

export default function CardBottomSheet({ isVisible, onBackdropPress, children }: CardBottomSheetProps) {

    return (
        <BottomSheet
            onBackdropPress={onBackdropPress}
            isVisible={isVisible}>
            <Card containerStyle={styles.bottomSheet}>
                {children}
            </Card>
        </BottomSheet>
    )
}