import { loadAsync } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useState, useEffect } from "react";

export default function useCachedResources() {
    const [isLoadingComplete, setLoadingComplete] = useState(false);

    const quicksandFontConfig = {
        "Quicksand": require("../assets/fonts/Quicksand-Regular.ttf"),
        "Quicksand-300": require("../assets/fonts/Quicksand-Light.ttf"),
        "Quicksand-500": require("../assets/fonts/Quicksand-Medium.ttf"),
        "Quicksand-600": require("../assets/fonts/Quicksand-SemiBold.ttf"),
        "Quicksand-700": require("../assets/fonts/Quicksand-Bold.ttf"),
    };

    useEffect(() => {
        async function loadResourcesAndDataAsync() {
            try {
                SplashScreen.preventAutoHideAsync();

                await loadAsync({
                    // heroicons: require("../../assets/fonts/heroicons.ttf"),
                    ...quicksandFontConfig,
                });

            } finally {
                setLoadingComplete(true);
                SplashScreen.hideAsync();
            }
        }

        loadResourcesAndDataAsync();
    }, []);

    return { isLoadingComplete };
}