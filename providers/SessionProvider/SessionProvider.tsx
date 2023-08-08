import { ReactNode, useEffect, useState } from "react";
import client from "../../api/client";
import { getJwtUser } from "../../lib/jwt";
import { useAsyncStorage } from "../../lib/storage";
import { UserSession } from "../../types/auth";
import SessionContext from "./SessionContext";

type SessionProviderProps = {
    children?: ReactNode;
    uSession?: UserSession;
}

export default function SessionProvider({ children, uSession }: SessionProviderProps) {
    const [session, setSession] = useState(uSession);
    const { storeData, removeData } = useAsyncStorage();

    useEffect(() => {
        session && storeData("session", session);
    }, [session]);

    const updateSession = async (session: Partial<UserSession>) => {
        const token = session?.token;
        let user = null;
        if (token) {
            user = getJwtUser(token);
            client.defaults.headers.common.Authorization = `Bearer ${token}`
        }
        setSession((prev: UserSession) => ({ token: token || prev?.token, userProfile: user || prev?.userProfile }));
    }

    const stopSession = async () => {
        await removeData("session");
        await removeData("account-setup");

        client.defaults.headers.common.Authorization = '';
        setSession(null);
    }

    return (
        <SessionContext.Provider value={{ session, updateSession, stopSession }}>
            {children}
        </SessionContext.Provider>
    )
}