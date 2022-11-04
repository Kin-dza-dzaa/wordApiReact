import React, { createContext } from "react";
import { useAuth } from "../../hooks/AuthProvider/useAuth";
import { LoadingOutlined } from '@ant-design/icons';
import Spin from "antd/lib/spin";
import Typography from "antd/lib/typography";

const { Paragraph } = Typography;
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

export interface authInterface {
    authState: boolean,
    SetAuthState: React.Dispatch<React.SetStateAction<boolean>>,
}

export const AuthContext = createContext({} as authInterface);

export const AuthProvider = ({ children }: { children: JSX.Element }): JSX.Element => {
    const auth = useAuth();
    return (
        !auth.isLodaing ?
            <AuthContext.Provider value={auth}>
                {children}
            </AuthContext.Provider>
            :
            <div style={{"display": "grid", "placeItems": "center", "gap": "30px", "margin": "2% 0 0 0"}}>
                <Spin indicator={antIcon} size="large" />
                <Paragraph>
                    Waiting too long? It seems like api doesn't respond. Try 5 min later.
                </Paragraph>
            </div>
    );
}

