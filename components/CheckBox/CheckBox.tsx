import { CheckBox as BaseCheckBox, CheckBoxProps as BaseCheckBoxProps } from "@rneui/base";
import { useTheme } from "@rneui/themed";

type CheckBoxProps = BaseCheckBoxProps;

export default function CheckBox(props: CheckBoxProps) {
    const { theme: { colors: { primary } } } = useTheme();

    return (
        <BaseCheckBox checkedColor={primary} {...props} />
    )
}