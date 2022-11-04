import { message, Spin } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { UserVerify } from '../api/user-calls';
import { useAuthContext } from '../hooks/AuthProvider/useAuthContext';

export const VerifyUserModal = () => {
    const navigate = useNavigate();
    const { verificationCode } = useParams();
    const authContext = useAuthContext();
    useEffect(() => {
        if (authContext.authState) {
            navigate("/home", {replace: true});
            return;
        }
        if (verificationCode && verificationCode.length === 16) {
            UserVerify(verificationCode)
            .then((res) => {
                if (res.message === "wrong verification code") {
                    message.error({duration: 4, style: {marginTop: "90vh"}, content: "Wrong verification code try sign-up again"});                    
                    navigate("/home");
                }
                if (res.result === "ok") {
                    authContext.SetAuthState(true);
                    console.log(authContext.authState);
                    message.success({duration: 2, style: {marginTop: "90vh"}, content: "Account created successfully"});
                    navigate("/home");
                }
            });
        } else {
            message.error({duration: 4, style: {marginTop: "90vh"}, content: "Wrong verification code try sign-up again"});                    
            navigate("/home");
        }
    }, []);

    return (
        <Modal
            title="Email verification"
            open={true}
            destroyOnClose={true}
            centered={true}
            footer={false}
        >
            <Spin tip="Loading..."
            style={{"display": "grid", "placeItems": "center"}}
            >

            </Spin>
        </Modal>
    )
}
