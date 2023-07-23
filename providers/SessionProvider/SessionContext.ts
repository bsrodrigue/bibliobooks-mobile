import { createContext } from "react";
import { UserProfile } from "../../types/auth";

type SessionContextType = {
    session: UserProfile;
    updateSession: (session: UserProfile) => void;
    stopSession: () => void;
}

const SessionContext = createContext<SessionContextType | null>(null);

export default SessionContext;