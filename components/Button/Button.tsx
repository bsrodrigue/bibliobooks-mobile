import { Button as BaseButton, ButtonProps as BaseButtonProps } from "@rneui/base";

type ButtonProps = BaseButtonProps;

export default function Button(props: ButtonProps) {

    return (
        <BaseButton {...props} />
    )

}