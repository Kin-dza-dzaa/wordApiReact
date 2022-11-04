import React from "react";
import Button from "antd/lib/button";
import { UserLogOut } from "../api/user-calls";
import { useAuthContext } from "../hooks/AuthProvider/useAuthContext";
import { Menu, message } from "antd";
import { useNavigate } from "react-router-dom";

export const AppBar = (): JSX.Element => {
    const authContext = useAuthContext();
    const navigate = useNavigate();
    const LogOut = () => {
        UserLogOut()
            .then(res => {
                if (res.result === "ok") {
                    navigate("/home", {replace: true});
                    authContext.SetAuthState(false);
                    message.success({ duration: 2, style: { marginTop: "90vh" }, content: "Successfully logged out" });
                }
            });
    }
    return (
        authContext.authState ?
            <React.Fragment>
                <img
                    src="http://localhost:3000/logo.png"
                    alt='logo'
                    style={{ "float": "left", "margin": "10px 40px 0 0", "width": "35px", "cursor": "pointer" }}
                    onClick={() => navigate("/home")}
                />
                <Button type="primary" size="middle" shape="round" onClick={LogOut} style={{ "float": "right", "margin": "15px" }}>Log out</Button>
                <Menu
                    mode="horizontal"
                    defaultSelectedKeys={[window.location.pathname.slice(1)]}
                    onSelect={({ key }) => {navigate(`/${key}`)}}
                    items={
                        [
                            {
                                label: "Home",
                                key: "home",
                            },
                            {
                                label: "Colleсtions",
                                key: "collections",
                            },
                            {
                                label: "Tips",
                                key: "tips",
                            },
                            {
                                label: "About",
                                key: "about",
                            },
                        ]
                    }
                    style={{ "borderBottom": "none" }}
                />
            </React.Fragment>
            :
            <React.Fragment>
                <img
                    src="http://localhost:3000/logo.png"
                    alt='logo'
                    style={{ "float": "left", "margin": "10px 40px 0 0", "width": "35px", "cursor": "pointer" }}
                    onClick={() => navigate("/home")}
                />
                <Button type="primary" size="middle" shape="round" onClick={() => navigate("/sign-in")} style={{ "float": "right", "margin": "15px" }}>Get started</Button>
                <Menu
                    mode="horizontal"
                    defaultSelectedKeys={[window.location.pathname.slice(1)]}
                    onSelect={({ key }) => navigate(`/${key}`)}
                    items={
                        [
                            {
                                label: "Home",
                                key: "home",
                            },
                            {
                                label: "Tips",
                                key: "tips",
                            },
                            {
                                label: "About",
                                key: "about"
                            },
                        ]
                    }
                    style={{ "borderBottom": "none" }}
                />
            </React.Fragment>
    );
}
