import { ReactNode, useState } from "react";
import { useAsyncStorage } from "../../lib/storage";
import { UserProfile } from "../../types/auth";
import SessionContext from "./SessionContext";

type SessionProviderProps = {
    children?: ReactNode;
    creds?: UserProfile;
}

export default function SessionProvider({ children, creds }: SessionProviderProps) {
    const [session, setSession] = useState(creds);
    const { storeData, removeData } = useAsyncStorage();

    const updateSession = async (session) => {
        setSession(session);
        await storeData("session", session);
    }

    const stopSession = async () => {
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