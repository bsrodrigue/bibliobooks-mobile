import { ReactNode, useEffect, useState } from "react";
import client from "../../api/client";
import { useAsyncStorage } from "../../lib/storage";
import { Session } from "../../types/auth";
import SessionContext, { SessionUpdateParams } from "./SessionContext";

type SessionProviderProps = {
    children?: ReactNode;
    initialSession?: Session;
}

export default function SessionProvider({ children, initialSession }: SessionProviderProps) {
    const [session, setSession] = useState(initialSession);
    const { storeData, removeData } = useAsyncStorage();

    useEffect(() => {
        session && storeData("session", session);
    }, [session]);

    const updateSession = (params: SessionUpdateParams) => {
        if (params.token) {
            client.defaults.headers.common.Authorization = `Bearer ${params.token}`;
        }
        setSession((prev) => ({ token: params?.token || prev?.token, profile: { ...prev?.profile, ...params?.profile } }));
    }


    const stopSession = async () => {
        client.defaults.headers.common.Authorization = '';
        await removeData("session");
        setSession(null);
    }

    return (
        <SessionContext.Provider value={{ session, updateSession, stopSession }}>
            {children}
        </SessionContext.Provider>
    )
}