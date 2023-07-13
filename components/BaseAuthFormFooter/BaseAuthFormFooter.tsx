import { StyleSheet, Text, TouchableWithoutFeedback } from "react-native";
import { Button } from "../Button";

const styles = StyleSheet.create({
    submit: {
        fontSize: 20,
        fontFamily: "Quicksand-700"
    },

    alternative: {
        textAlign: "center",
        textDecorationLine: "underline",
    },
});

type BaseAuthFormFooterProps = {
    submitTitle: string;
    alternativeTitle: string;
    alternativeTitleNext: string;
    onPressTitle?: () => void;
    onPressAlternative?: () => void;
}

export default function Footer({ submitTitle,
    alternativeTitle,
    alternativeTitleNext,
    onPressTitle,
    onPressAlternative }: BaseAuthFormFooterProps) {
    return (
        <>
            <Button
                title={submitTitle}
                titleStyle={styles.submit}
                color="black"
                size="lg"
                radius={5}
                onPress={onPressTitle}
            />
            <Text style={styles.alternative}>{alternativeTitle}
                {" "}
                <TouchableWithoutFeedback onPress={onPressAlternative}>
                    <Text style={{ color: "#22A39F", }}>{alternativeTitleNext}</Text>
                </TouchableWithoutFeedback>
            </Text>
        </>
    )
}