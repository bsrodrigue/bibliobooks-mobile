import { Icon } from "@rneui/base";
import { TextInput } from "../Input";

type PasswordInputProps = {
    errorMessage?: string;
    value?: string;
    onChangeText?: (value: string) => void;
    placeholder?: string;
    label?: string;
}

export default function PasswordInput({ ...props }: PasswordInputProps) {
    return (
        <TextInput
            leftIcon={<Icon name="lock" type="foundation" />}
            secureTextEntry
            {...props}
        />
    )
}