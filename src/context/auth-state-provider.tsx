import { createContext, useState, useEffect } from "react";
import { UserCheck } from "../api/user-calls";
import React from 'react';

export const AuthContext = createContext({} as {LogState: boolean, setLogState: React.Dispatch<React.SetStateAction<boolean>>});

export const AuthProvider = ({children} : {children: JSX.Element}): JSX.Element => {
    const [LogState, setLogState] = useState(false); 
    const [isLoading, setLoading] = useState(true); 
    useEffect(() => {
        UserCheck().then((res) => {
            if (res.result === "ok") {
                setLogState(true);
                setLoading(false);
            } else {
                setLogState(false);
                setLoading(false);
            }
        });
    }, [LogState]);
    if (isLoading) {
        return (
            <></>
        );
    } else {
        return (
            <AuthContext.Provider value={{LogState, setLogState}}>
                {children}
            </AuthContext.Provider>
        );  
    }
}
