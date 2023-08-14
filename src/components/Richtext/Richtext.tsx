import React from "react";
import { ScrollView } from "react-native";
import { RichEditor } from "react-native-pell-rich-editor";
import initialCSSText from "../../config/richtext";

type RichtextProps = {
    initialContentHTML?: string;
    ref?: React.LegacyRef<RichEditor>;
    onChange?: (value: string) => void;
    placeholder?: string;
    lightMode?: boolean;
    disabled?: boolean;
}

const Richtext = React.forwardRef((
    {
        initialContentHTML,
        onChange, placeholder,
        lightMode, disabled
    }: RichtextProps, ref: React.ForwardedRef<RichEditor>
) => (

    <ScrollView>
        <RichEditor
            placeholder={placeholder}
            androidLayerType="hardware"
            initialContentHTML={initialContentHTML}
            editorStyle={initialCSSText(lightMode)}
            ref={ref}
            onChange={onChange}
            disabled={disabled}
        />
    </ScrollView>
))

export default Richtext;