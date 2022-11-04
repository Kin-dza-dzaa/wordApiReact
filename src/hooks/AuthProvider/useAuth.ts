import { useEffect, useState } from "react"
import { UserUpdateToken } from "../../api/user-calls";

export const useAuth = () => {
    const [isLodaing, setLoading] = useState(true);
    const [authState, SetAuthState] = useState(false);
    useEffect(() => {
        UserUpdateToken()
            .then((json) => {
                setLoading(false);
                SetAuthState(json.result === "ok");
            });
    }, [authState]);
    useEffect(() => {
        setInterval(
            () => {
                UserUpdateToken()
                    .then((json) => {
                        SetAuthState(json.result === "ok");
                    })
            },
            300000);
    });
    return { isLodaing, authState, SetAuthState };
}