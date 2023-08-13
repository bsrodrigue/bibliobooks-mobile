import { useContext } from "react";
import UserProfileContext from "./UserProfileContext";

export default function useUserProfile() {
    const { userProfile } = useContext(UserProfileContext);
    return { userProfile };
}