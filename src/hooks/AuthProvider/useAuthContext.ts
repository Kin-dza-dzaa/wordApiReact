import { useContext } from "react";
import { AuthContext, authInterface } from "../../contexts/AuthProvider/auth-provider";

export const useAuthContext = (): authInterface => {
    const context = useContext(AuthContext);
    return context;
}