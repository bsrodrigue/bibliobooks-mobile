import AsyncStorage from "@react-native-async-storage/async-storage";

export function useAsyncStorage() {

    const storeData = async (key: string, value: object) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem(key, jsonValue);
        } catch (error) {

        }
    }

    const getData = async (key: string) => {
        try {
            const value = await AsyncStorage.getItem(key);
            return value;
        } catch (error) {

        }
    }

    return {
        storeData, getData
    }
}