import { ReactNode } from "react";
import { View } from "react-native";
import { config } from "../../config";

type WrapperProps = {
    children?: ReactNode;
    horizontalPadding?: number;
};

export default function Wrapper({ children, horizontalPadding }: WrapperProps) {

    return (<View style={{ paddingHorizontal: horizontalPadding || config.wrapperHorizontalPadding }}>
        {children}
    </View>)
}