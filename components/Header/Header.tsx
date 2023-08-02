import { Icon } from "@rneui/base";
import { TouchableOpacity, View } from "react-native";
import { Searchbar } from "../Searchbar";

type HeaderProps = {
    searchMode?: boolean;
    onSearchPress?: () => void;
    onPressSettings?: () => void;
    onPressNotifications?: () => void;
    onChange?: (value: string) => void;
};

export default function Header({ searchMode, onPressSettings, onSearchPress, onPressNotifications, onChange }: HeaderProps) {
    return (
        <View style={{ backgroundColor: "white", flexDirection: "row", paddingVertical: 10, justifyContent: "space-between" }}>
            <TouchableOpacity onPress={onSearchPress}>
                <Searchbar searchMode={searchMode} onChange={onChange} />
            </TouchableOpacity>

            {
                !searchMode && (
                    <View style={{ flexDirection: "row", alignItems: "center", marginRight: 15, gap: 15 }}>
                        <TouchableOpacity onPress={onPressSettings}>
                            <Icon type="font-awesome-5" name="cog" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onPressNotifications}>
                            <Icon type="font-awesome-5" name="bell" />
                        </TouchableOpacity>
                    </View>
                )
            }

        </View>

    )
}