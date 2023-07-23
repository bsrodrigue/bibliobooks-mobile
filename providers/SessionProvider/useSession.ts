import { useContext } from "react";
import SessionContext from "./SessionContext";

export default function useSession() {
    const { session, updateSession, stopSession } = useContext(SessionContext);
    return { session, updateSession, stopSession };
}