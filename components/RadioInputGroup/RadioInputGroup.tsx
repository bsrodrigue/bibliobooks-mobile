import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { RadioInput } from "../RadioInput";
import { RadioInputOption } from "../../types";

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
                            selected={selected}
                            onPress={setSelected}
                            imgSrc={require("../../assets/illustrations/male.png")}
                            {...option}
                        />
                    ))
                }
            </View>
        </>
    )
}