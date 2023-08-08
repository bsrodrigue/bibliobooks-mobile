import { loadAsync } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { useAsyncStorage } from "../lib/storage";
import { UserSession } from "../types/auth";
import { getJwtExpirationDate } from "../lib/jwt";
import client from "../api/client";

export default function useCachedResources() {
    const [isLoadingComplete, setLoadingComplete] = useState(false);
    const [session, setSession] = useState<UserSession>();
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

                const jsonSession = await getData("session");
                let session: UserSession = JSON.parse(jsonSession);

                let expirationDate = null;

                if (session?.token) {
                    expirationDate = getJwtExpirationDate(session.token);
                }

                if (expirationDate === null || new Date() >= expirationDate) {
                    setSession(null);
                } else {
                    client.defaults.headers.common.Authorization = `Bearer ${session.token}`
                    setSession(session);
                }


                const onboarding = await getData("onboarding");
                setOnboarding(JSON.parse(onboarding));

            } finally {
                setLoadingComplete(true);
                SplashScreen.hideAsync();
            }
        }

        loadResourcesAndDataAsync();
    }, []);

    return { isLoadingComplete, session, onboarding };
}