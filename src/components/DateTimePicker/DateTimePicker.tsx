import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { TouchableOpacity } from "react-native";
import { TextInput } from "../Input";
import { mom } from "../../lib/moment";

type DateTimePickerProps = {
    date: Date;
    onChange: (value: Date) => void;
    mode: "date" | "time";
    errorMessage?: string;
}

export default function DateTimePicker({ date, mode, errorMessage, onChange }: DateTimePickerProps) {
    const onOpenDatePicker = () => {
        DateTimePickerAndroid.open({
            mode,
            value: date, onChange: (_e, date) => {
                onChange(date);
            }
        });
    }

    return (
        <TouchableOpacity
            onPress={onOpenDatePicker}
            style={{ marginVertical: 10 }}>
            <TextInput
                label="Date de naissance"
                disabled
                placeholder="Veuillez choisir votre date de naissance"
                errorMessage={errorMessage}
                value={mom(date).format("dddd DD MMMM y")}
            />
        </TouchableOpacity>
    )
}