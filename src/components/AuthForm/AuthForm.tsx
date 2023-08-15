import { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        paddingHorizontal: 40,
    },

    header: {
        marginVertical: 10
    },

    title: {
        fontSize: 35,
        fontFamily: "Quicksand-700",
    },

    subtitle: {
        fontSize: 18,
        fontFamily: "Quicksand-500",
        opacity: 0.5
    },

    body: {
        flex: 1,
        marginVertical: 10,
    },
});

type AuthFormProps = {
    title?: string;
    subtitle?: string;
    children?: ReactNode;
};

export default function AuthForm({ children, title, subtitle }: AuthFormProps) {

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