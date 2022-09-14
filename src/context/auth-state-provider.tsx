import { useQuery } from "@tanstack/react-query";
import { createContext, useState } from "react";
import { UserCheck } from "../api/user-calls";
// import Skeleton from 'react-loading-skeleton'
// import 'react-loading-skeleton/dist/skeleton.css'

export const AuthContext = createContext({} as {LogState: boolean, SetLogState: React.Dispatch<React.SetStateAction<boolean>>});

export const AuthProvider = ({children} : {children: JSX.Element}) => {
    const [LogState, SetLogState] = useState(false); 
    const options: RequestInit = {
        method: "GET",
        mode: "cors",
        credentials: "include",
      }
    const result = useQuery(["user"], () => UserCheck(options), {onSuccess(data) {
        SetLogState(data.result === "ok");
    },},);

    return (
        <AuthContext.Provider value={{LogState, SetLogState}}>
            {children}
        </AuthContext.Provider>
    );
}
