import { useContext } from 'react';
import { AuthContext } from '../context/auth-state-provider';

export const useAuthContext = (): { LogState: boolean, SetLogState: React.Dispatch<React.SetStateAction<boolean>>} => {
    return useContext(AuthContext);
}