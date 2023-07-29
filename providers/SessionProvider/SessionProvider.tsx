import { ReactNode, useEffect, useState } from "react";
import { auth } from "../../config/firebase";
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
        setSession((prev: UserSession) => ({ ...prev, ...session }));
    }

    const stopSession = async () => {
        await auth.signOut();
        await removeData("session");
        await removeData("account-setup");
        setSession(null);
    }

    return (
        <SessionContext.Provider value={{ session, updateSession, stopSession }}>
            {children}
        </SessionContext.Provider>
    )
}