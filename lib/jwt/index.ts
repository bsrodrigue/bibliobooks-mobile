import jwtDecode from "jwt-decode";
import { UserProfile } from "../../types/auth";

export function getJwtExpirationDate(token: string): Date {
    try {
        const decodedToken = jwtDecode(token) as any;
        if (decodedToken?.exp) {
            const expirationDate = new Date(decodedToken.exp * 1000); // Convert to milliseconds
            return expirationDate;
        } else {
            console.log('JWT does not contain an expiration date');
        }
    } catch (error) {
        console.error('Error decoding JWT:', error);
    }
}

export function getJwtUser(token: string): UserProfile {
    try {
        const decodedToken = jwtDecode(token) as any;
        if (decodedToken?.user) {
            return decodedToken.user;
        } else {
            console.log('JWT does not contain a user');
        }
    } catch (error) {
        console.error('Error decoding JWT:', error);
    }
}