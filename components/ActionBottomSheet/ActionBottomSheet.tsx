import { Icon } from "@rneui/base";
import { useTheme } from "@rneui/themed";
import { useRef } from "react";
import { Dimensions, FlatList, Text, TouchableOpacity, View } from "react-native";
import { Action } from "../../types";
import { Chapter, Novel } from "../../types/models";
import { Button } from "../Button";
import { CardBottomSheet } from "../CardBottomSheet";

type ActionBottomSheetProps = {
    item: Novel | Chapter;
    isVisible?: boolean;
    onBackdropPress?: () => void;
    actions: Action[];
    confirm?: boolean;
    onConfirm?: () => void;
    loading?: boolean;
    onActionFinished?: () => void;
}

export default function ActionBottomSheet({
    item: entity, isVisible, onBackdropPress,
    actions, confirm, onConfirm, loading,
    onActionFinished }: ActionBottomSheetProps) {

    const { theme: { colors: { greyOutline, error } } } = useTheme();
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
                        onPress={
                            async () => {
                                !loading && await onPress(entity)
                                onActionFinished?.();
                            }
                        }
                        style={{
                            borderWidth: 1,
                            borderColor: greyOutline,
                            borderRadius: 10,
                            width,
                            height: width,
                            justifyContent: "center",
                            alignItems: "center",
                            marginVertical: 10,
                            opacity: loading ? 0.5 : 1
                        }}>
                        <Icon name={icon} type="font-awesome-5" />
                        <Text style={{ fontFamily: "Quicksand-700" }}>{title}</Text>
                    </TouchableOpacity>
                )} />
            {
                confirm && (
                    <View>
                        <Button loading={loading} onPress={onConfirm} color={error}>Confirmer</Button>
                    </View>
                )
            }
        </CardBottomSheet>
    )
}