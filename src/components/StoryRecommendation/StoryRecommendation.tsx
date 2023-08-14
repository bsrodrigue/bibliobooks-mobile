import { Card, Chip } from "@rneui/base";
import { useTheme } from "@rneui/themed";
import { ImageBackground, ImageSourcePropType, Text, TouchableOpacity, View } from "react-native";

type StoryRecommendationProps = {
    title: string;
    subtitle: string;
    novel: {
        title: string;
        description: string;
        chapterCount: number;
        imgSrc: ImageSourcePropType;
        mature: boolean;
    },
    onPress?: () => void;
}

export default function StoryRecommendations({ title, subtitle, novel, onPress }: StoryRecommendationProps) {
    const { theme: { colors: { primary } } } = useTheme();

    return (
        <View style={{ marginVertical: 10 }}>
            <Card containerStyle={{ margin: 0, borderRadius: 10, backgroundColor: primary, borderWidth: 0 }}>
                <View>
                    <View style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}  >
                        <Text style={{ fontFamily: "Quicksand-700", fontSize: 16, color: "white" }}>{title}</Text>
                        {novel.mature ? (<Chip color="error" size="sm" radius="md" title="18+" />) : null}
                    </View>
                    <Text style={{ fontFamily: "Quicksand-500", color: "white", opacity: 0.8, fontStyle: "italic" }}>{subtitle}</Text>
                    <TouchableOpacity onPress={onPress}>
                        <ImageBackground borderRadius={10} style={{ width: "100%", height: 100, marginVertical: 10 }} source={novel.imgSrc} >
                        </ImageBackground>
                    </TouchableOpacity>
                </View>
            </Card>
        </View>
    )
}