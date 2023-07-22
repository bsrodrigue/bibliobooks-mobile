import { UserCredential } from "firebase/auth";
import { ReactNode, createContext, useState } from "react";
export const SessionContext = createContext({});

type SessionProviderProps = {
    children?: ReactNode;
    creds?: UserCredential;
}

export default function SessionProvider({ children, creds }: SessionProviderProps) {
    const [session, setSession] = useState(creds)

    return (
        <SessionContext.Provider value={{ session, setSession }}>
            {children}
        </SessionContext.Provider>
    )
}