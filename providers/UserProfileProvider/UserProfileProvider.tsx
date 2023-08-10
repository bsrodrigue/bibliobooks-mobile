import { ReactNode, useEffect, useState } from "react";
import { getUserProfile } from "../../api/auth";
import { useAsyncStorage } from "../../lib/storage";
import { UserProfile } from "../../types/auth";
import { useSession } from "../SessionProvider";
import SessionContext from "./UserProfileContext";

type UserProfileProviderProps = {
    children?: ReactNode;
    initialProfile?: UserProfile;
}

export default function UserProfileProvider({ children, initialProfile }: UserProfileProviderProps) {
    const { token } = useSession();
    const { storeData } = useAsyncStorage();
    const [userProfile, setUserProfile] = useState<UserProfile>(initialProfile)

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const result = await getUserProfile({});
                await storeData("profile", result);
                setUserProfile(result);
            } catch (error) {
                console.error(error);
            }
        }

        token && fetchUserProfile();
    }, [token]);

    return (
        <SessionContext.Provider value={{ userProfile }}>
            {children}
        </SessionContext.Provider>
    )
}