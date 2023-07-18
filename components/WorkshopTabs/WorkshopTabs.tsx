import { Divider } from "@rneui/base";
import { useTheme } from "@rneui/themed";
import { Text, TouchableOpacity, View } from "react-native";
import { TabItem } from "../../types";

type WorkshopTabsProps = {
    items: TabItem[];
    selectedItem: string;
    onPressTab?: (label: string) => void;
};

export default function WorkshopTabs({ items, selectedItem, onPressTab }: WorkshopTabsProps) {
    const { theme: { colors: { primary } } } = useTheme();

    return (
        <View style={{ backgroundColor: "white" }} >
            <Divider style={{ opacity: 0.5 }} />
            <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 40 }}>
                {
                    items.map(({ label }, index) => (
                        <TouchableOpacity onPress={() => {
                            onPressTab?.(label);
                        }} key={index} style={{ alignItems: "center" }}>
                            <Text style={{ color: selectedItem === label ? primary : "black", fontSize: 14, fontFamily: "Quicksand-700", paddingVertical: 3 }}>{label}</Text>
                            {
                                selectedItem === label ? (
                                    <View style={{ backgroundColor: primary, width: 20, height: 5, borderRadius: 25 }} />
                                ) : null
                            }
                        </TouchableOpacity>
                    ))
                }
            </View>
        </View>
    )
}