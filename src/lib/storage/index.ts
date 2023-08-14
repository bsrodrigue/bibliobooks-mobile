import AsyncStorage from "@react-native-async-storage/async-storage";

function handleAsyncStorageError(_error) {
}

export function useAsyncStorage() {

    const storeData = async (key: string, value: object) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem(key, jsonValue);
        } catch (error) {
            handleAsyncStorageError(error);
        }
    }

    const getData = async (key: string) => {
        try {
            const value = await AsyncStorage.getItem(key);
            return value;
        } catch (error) {
            handleAsyncStorageError(error);
        }
    }

    const removeData = async (key: string) => {
        try {
            await AsyncStorage.removeItem(key)
        } catch (error) {
            handleAsyncStorageError(error);
        }
    }

    return {
        storeData, getData, removeData
    }
}