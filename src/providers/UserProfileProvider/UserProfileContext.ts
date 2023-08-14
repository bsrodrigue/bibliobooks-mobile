import { createContext } from "react";
import { UserProfile } from "../../types/auth";

type UserProfileContextType = {
    userProfile?: UserProfile
}

const UserProfileContext = createContext<UserProfileContextType | null>(null);

export default UserProfileContext;