import { Icon } from "@rneui/base";
import { TextInput } from "../Input";

type SearchbarProps = {
    searchMode?: boolean;
}

export default function Searchbar({ searchMode }: SearchbarProps) {

    return (
        <TextInput
            disabled={!searchMode}
            inputContainerStyle={{
                backgroundColor: "#F5F5F5",
                borderBottomWidth: 0,
                borderRadius: 25,
                paddingHorizontal: 15,
            }}
            containerStyle={{
                width: 250
            }}
            errorStyle={{ backgroundColor: "transparent" }}
            placeholder="Rechercher des histoires"
            leftIcon={<Icon type="font-awesome-5" name="search" />}
            leftIconContainerStyle={{ marginRight: 10, opacity: 0.8 }}
        />
    )
}