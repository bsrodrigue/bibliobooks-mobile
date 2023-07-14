import { BottomSheet, Card, Icon } from "@rneui/base";
import { useTheme } from "@rneui/themed";
import { useRef } from "react";
import { Dimensions, FlatList, Text, TouchableOpacity } from "react-native";
import { Action } from "../../types";

type ActionBottomSheetProps = {
    isVisible?: boolean;
    onBackdropPress?: () => void;
    actions: Action[];
}

export default function ActionBottomSheet({ isVisible, onBackdropPress, actions }: ActionBottomSheetProps) {
    const { theme: { colors: { greyOutline } } } = useTheme();
    const { width: screenWidth } = Dimensions.get("screen");
    const columns = useRef(3);
    const width = (screenWidth - 100) / 3;

    return (
        <BottomSheet
            onBackdropPress={onBackdropPress}
            isVisible={isVisible}>
            <Card containerStyle={{
                margin: 0,
                borderTopStartRadius: 25,
                borderTopEndRadius: 25,
                flex: 1,
                paddingHorizontal: 10,
                justifyContent: "center",
                alignItems: "center",
            }}>
                <FlatList
                    numColumns={columns.current}
                    columnWrapperStyle={{ gap: 15 }}
                    data={actions} renderItem={({ item: { title, icon, onPress } }) => (
                        <TouchableOpacity
                            onPress={onPress}
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
            </Card>
        </BottomSheet>
    )
}