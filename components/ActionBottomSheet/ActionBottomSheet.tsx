import { Icon } from "@rneui/base";
import { useTheme } from "@rneui/themed";
import { useRef } from "react";
import { Dimensions, FlatList, Text, TouchableOpacity } from "react-native";
import { Action } from "../../types";
import { Novel } from "../../types/models";
import { CardBottomSheet } from "../CardBottomSheet";

type ActionBottomSheetProps = {
    novel?: Novel;
    isVisible?: boolean;
    onBackdropPress?: () => void;
    actions: Action[];
}

export default function ActionBottomSheet({ novel, isVisible, onBackdropPress, actions }: ActionBottomSheetProps) {
    const { theme: { colors: { greyOutline } } } = useTheme();
    const { width: screenWidth } = Dimensions.get("screen");
    const columns = useRef(3);
    const width = (screenWidth - 100) / 3;

    return (
        <CardBottomSheet onBackdropPress={onBackdropPress} isVisible={isVisible}>
            <FlatList
                numColumns={columns.current}
                columnWrapperStyle={{ gap: 15 }}
                data={actions} renderItem={({ item: { title, icon, onPress } }) => (
                    <TouchableOpacity
                        onPress={() => onPress(novel)}
                        style={{
                            borderWidth: 1,
                            borderColor: greyOutline,
                            borderRadius: 10,
                            width,
                            height: width,
                            justifyContent: "center",
                            alignItems: "center",
                            marginVertical: 10
                        }}>
                        <Icon name={icon} type="font-awesome-5" />
                        <Text style={{ fontFamily: "Quicksand-700" }}>{title}</Text>
                    </TouchableOpacity>
                )} />
        </CardBottomSheet>
    )
}