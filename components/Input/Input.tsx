import { Input, InputProps } from "@rneui/base";
import { useTheme } from "@rneui/themed";
import { forwardRef } from "react";

type TextInputProps = InputProps & {
    name?: string;
};

const TextInput = forwardRef(({ onChange, inputStyle, ...props }: TextInputProps, ref) => {
    const { theme: { colors: { error } } } = useTheme();
    return (
        <Input
            errorStyle={{
                position: "absolute",
                bottom: -10,
                right: 25,
                backgroundColor: "white",
                paddingHorizontal: 5,
                zIndex: 1,
                fontStyle: "italic"
            }}
            leftIconContainerStyle={{
                marginRight: 5
            }}
            containerStyle={{
                marginVertical: 10,
            }}
            inputStyle={
                [
                    {
                        fontSize: 14,
                        fontFamily: "Quicksand-600",
                    },
                    inputStyle
                ]
            }
            disabledInputStyle={{
                fontSize: 14,
                fontFamily: "Quicksand-600",
                opacity: 1
            }}
            labelStyle={{
                color: "black",
                position: "absolute",
                top: -10,
                left: 25,
                backgroundColor: "white",
                zIndex: 1,
                paddingHorizontal: 5,
                fontFamily: "Quicksand-700",
                fontWeight: "normal",
                fontSize: 12
            }}
            inputContainerStyle={{
                borderColor: props.errorMessage ? error : "#CCCCCC",
                borderWidth: 1,
                borderRadius: 10,
                paddingVertical: 5,
                paddingHorizontal: 10,
                marginHorizontal: -10
            }}
            {...props}
            ref={ref}
        />
    )
});

export default TextInput;