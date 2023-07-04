import { Input, InputProps } from "@rneui/base";

type TextInputProps = InputProps & { name?: string };

export default function TextInput(props: TextInputProps) {
    return (
        <Input
            errorStyle={{
                position: "absolute",
                bottom: -10,
                left: 25,
                backgroundColor: "white",
                zIndex: 1,
            }}
            containerStyle={{
                marginVertical: 10,
            }}
            inputStyle={{
                fontSize: 14
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
                fontSize: 12
            }}
            inputContainerStyle={{
                borderColor: "#CCCCCC",
                borderWidth: 1,
                borderRadius: 10,
                paddingVertical: 5,
                paddingHorizontal: 10,
                marginHorizontal: -10
            }}
            {...props}
        />
    )
}


