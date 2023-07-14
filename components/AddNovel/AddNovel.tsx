import { Icon } from "@rneui/base";
import { useTheme } from "@rneui/themed";
import { Dimensions, Text, View } from "react-native";

type AddNovelProps = {
    label: string;
}

export default function AddNovel({ label }: AddNovelProps) {
    const screenWidth = Dimensions.get('window').width;
    const { theme: { colors: { greyOutline } } } = useTheme();

    return (
        <>
            <View style={{
                height: 150,
                backgroundColor: greyOutline, justifyContent: "center", alignItems: "center", borderRadius: 10, opacity: 0.5
            }}>
                <Icon name="plus" type="font-awesome-5" size={30} />
                <Text
                    style={{
                        fontSize: 14,
                        fontFamily: "Quicksand-700",
                        textAlign: "center",
                        width: 75
                    }}
                >{label}</Text>
            </View>
            <Text style={{ width: (screenWidth - 75) / 3, marginBottom: 20 }} />
        </>
    )
}

