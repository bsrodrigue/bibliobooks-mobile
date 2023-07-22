import { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        paddingHorizontal: 40,
    },

    header: {
        flex: 0.1,
        marginVertical: 10
    },

    title: {
        fontSize: 40,
        fontFamily: "Quicksand-700",
        marginBottom: 10
    },

    subtitle: {
        fontSize: 20,
        fontFamily: "Quicksand-500",
        fontStyle: "italic",
        opacity: 0.5
    },

    body: {
        flex: 0.9,
        marginVertical: 10
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
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.subtitle}>{subtitle}</Text>
            </View>
            <View style={styles.body}>
                {children}
            </View>
        </View>
    )
}