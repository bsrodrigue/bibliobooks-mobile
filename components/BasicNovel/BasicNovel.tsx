import { Image, ImageStyle, StyleProp, Text, TextStyle } from "react-native";
import { Novel } from "../../types";

type BasicNovelProps = {
    novel: Novel;
    imageStyle?: StyleProp<ImageStyle>;
    labelStyle?: StyleProp<TextStyle>
};

export default function BasicNovel({ novel: { title, imgSrc }, imageStyle, labelStyle }: BasicNovelProps) {
    return (
        <>
            <Image
                resizeMode="cover"
                source={imgSrc}
                style={imageStyle}
            />
            <Text style={labelStyle}
            >{title}</Text>
        </>
    )
}