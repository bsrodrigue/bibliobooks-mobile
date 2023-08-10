import { Button as BaseButton, ButtonProps as BaseButtonProps } from "@rneui/base";
import { useTheme } from "@rneui/themed";

type ButtonProps = BaseButtonProps;

export default function Button({ titleStyle, ...rest }: ButtonProps) {
    const { theme: { colors: { black } } } = useTheme();
    return (
        <BaseButton
            titleStyle={[{ fontFamily: "Quicksand-700", fontSize: 16 }, titleStyle]}
            color={black}
            size="md"
            radius={5}
            disabled={rest.loading || rest.disabled} {...rest} />
    )
}