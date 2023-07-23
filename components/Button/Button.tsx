import { Button as BaseButton, ButtonProps as BaseButtonProps } from "@rneui/base";

type ButtonProps = BaseButtonProps;

export default function Button({ titleStyle, ...rest }: ButtonProps) {
    return (
        <BaseButton
            titleStyle={{ fontFamily: "Quicksand-700", fontSize: 20 }}
            color="black"
            size="lg"
            radius={5}
            disabled={rest.loading || rest.disabled} {...rest} />
    )
}