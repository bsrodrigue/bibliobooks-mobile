import { Image, ImageStyle, StyleProp, Text, TextStyle } from "react-native";
import { Novel } from "../../types/models";

type BasicNovelProps = {
    novel: Novel;
    imageStyle?: StyleProp<ImageStyle>;
    labelStyle?: StyleProp<TextStyle>
};

export default function BasicNovel({ novel: { title, coverUrl }, imageStyle, labelStyle }: BasicNovelProps) {
    const source = coverUrl ? { uri: coverUrl } : require("../../assets/illustrations/placeholder.png");
    return (
        <>
            <Image
                resizeMode="cover"
                source={source}
                style={imageStyle}
            />
            <Text style={labelStyle}
            >{title}</Text>
        </>
    )
}