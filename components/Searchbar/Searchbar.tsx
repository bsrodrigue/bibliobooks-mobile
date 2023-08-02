import { Icon } from "@rneui/base";
import { Dimensions } from "react-native";
import { TextInput } from "../Input";

type SearchbarProps = {
    searchMode?: boolean;
    onChange?: (value: string) => void;
}

export default function Searchbar({ searchMode, onChange }: SearchbarProps) {
    const width = searchMode ? Dimensions.get("window").width : 250;

    return (
        <TextInput
            disabled={!searchMode}
            onChangeText={onChange}
            inputContainerStyle={{
                backgroundColor: "#F5F5F5",
                borderBottomWidth: 0,
                borderRadius: 25,
                paddingHorizontal: 15,
            }}
            containerStyle={{ width }}
            errorStyle={{ backgroundColor: "transparent" }}
            placeholder="Rechercher des histoires"
            leftIcon={<Icon type="font-awesome-5" name="search" />}
            leftIconContainerStyle={{ marginRight: 10, opacity: 0.8 }}
        />
    )
}