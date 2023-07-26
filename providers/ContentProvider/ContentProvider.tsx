import { ReactNode, useState } from "react";
import SessionContext from "./ContentContext";
import { useSession } from "../SessionProvider";
import { Novel } from "../../types/models";

type ContentProviderProps = {
    children?: ReactNode;
}

export default function SessionProvider({ children }: ContentProviderProps) {
    const { session: { userProfile: { userId } } } = useSession();
    const [publicNovels, setPublicNovels] = useState<Array<Novel>>([]);

    return (
        <SessionContext.Provider value={{}}>
            {children}
        </SessionContext.Provider>
    )
}