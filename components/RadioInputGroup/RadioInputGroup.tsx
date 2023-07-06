import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { RadioInputOption } from "../../types";
import { RadioInput } from "../RadioInput";

type RadioInputGroupProps = {
    label: string;
    name: string;
    options: RadioInputOption[];
    onChange?: (value: string) => void;
}

export default function RadioInputGroup({ label, name: _name, onChange, options }: RadioInputGroupProps) {
    const [selected, setSelected] = useState("");

    useEffect(() => {
        onChange?.(selected);
    }, [selected]);

    return (
        <>
            <Text style={{ fontFamily: "Quicksand-700" }}>{label}</Text>
            <View style={{ flexDirection: "row", gap: 14, marginVertical: 5 }}>
                {
                    options.map((option) => (
                        <RadioInput
                            key={option.value}
                            selected={selected}
                            onPress={setSelected}
                            imgSrc={option.imgSrc}
                            {...option}
                        />
                    ))
                }
            </View>
        </>
    )
}