import { Toast } from "react-native-toast-message/lib/src/Toast";

const notify = {
    error: (message: string) => {
        Toast.show({
            type: "error",
            text1: message
        })
    },
    success: (message: string) => {
        Toast.show({
            type: "success",
            text1: message
        })
    }
};

export default notify;