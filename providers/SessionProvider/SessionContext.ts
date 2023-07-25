import { createContext } from "react";
import { UserSession } from "../../types/auth";


type SessionContextType = {
    session: UserSession;
    updateSession: (session: Partial<UserSession>) => Promise<void>;
    stopSession: () => void;
}

const SessionContext = createContext<SessionContextType | null>(null);

export default SessionContext;