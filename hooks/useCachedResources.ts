import { loadAsync } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { useAsyncStorage } from "../lib/storage";

export default function useCachedResources() {
    const [isLoadingComplete, setLoadingComplete] = useState(false);
    const [session, setSession] = useState();
    const [setup, setSetup] = useState();
    const [onboarding, setOnboarding] = useState();
    const { getData } = useAsyncStorage();

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
                    ...quicksandFontConfig,
                });

                const session = await getData("session");
                setSession(JSON.parse(session));

                const onboarding = await getData("onboarding");
                setOnboarding(JSON.parse(onboarding));

                const setup = await getData("account-setup");
                setSetup(JSON.parse(setup));

            } finally {
                setLoadingComplete(true);
                SplashScreen.hideAsync();
            }
        }

        loadResourcesAndDataAsync();
    }, []);

    return { isLoadingComplete, session, onboarding, setup };
}