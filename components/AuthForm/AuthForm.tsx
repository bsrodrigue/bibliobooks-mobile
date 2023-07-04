import { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        paddingVertical: 30,
        paddingHorizontal: 40,
    },

    header: {
        flex: 0.2,
    },

    title: {
        fontSize: 40,
        fontFamily: "Quicksand-700",
        marginBottom: 10
    },

    subtitle: {
        fontFamily: "Quicksand-500",
        opacity: 0.75
    },

    body: {
        flex: 0.6,
        marginVertical: 15
    },

    footer: {
        flex: 0.2,
        justifyContent: "flex-end",
        gap: 15,
    },

});

type AuthFormProps = {
    title?: string;
    subtitle?: string;
    children?: ReactNode;
    footer?: ReactNode;
};

export default function AuthForm({ children, footer, title, subtitle }: AuthFormProps) {

    return (
        <View
            style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.subtitle}>{subtitle}</Text>
            </View>
            <KeyboardAwareScrollView style={styles.body}>
                {children}
            </KeyboardAwareScrollView>
            <View style={styles.footer}>
                {footer}
            </View>
        </View>
    )
}