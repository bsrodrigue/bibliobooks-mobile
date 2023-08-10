import { createContext } from "react";
import { Session, UserProfile } from "../../types/auth";

export type SessionUpdateParams = Partial<{ token?: string; profile?: Partial<UserProfile> }>;

type SessionContextType = {
    session?: Session;
    updateSession: (session: SessionUpdateParams) => void;
    stopSession: () => void;
}

const SessionContext = createContext<SessionContextType | null>(null);

export default SessionContext;