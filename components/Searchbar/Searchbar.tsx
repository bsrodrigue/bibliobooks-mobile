import { Icon } from "@rneui/base";
import { useTheme } from "@rneui/themed";
import { ActivityIndicator, Dimensions } from "react-native";
import { TextInput } from "../Input";

type SearchbarProps = {
    searchMode?: boolean;
    onChange?: (value: string) => void;
    loading?: boolean;
}

export default function Searchbar({ searchMode, onChange, loading }: SearchbarProps) {
    const width = searchMode ? Dimensions.get("window").width : 250;
    const { theme: { colors: { primary } } } = useTheme();

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
            rightIcon={loading ? (<ActivityIndicator color={primary} />) : null}
            leftIconContainerStyle={{ marginRight: 10, opacity: 0.8 }}
        />
    )
}