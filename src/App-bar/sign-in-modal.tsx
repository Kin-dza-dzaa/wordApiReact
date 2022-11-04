import { Input, Alert, Button, message } from 'antd';
import Form from 'antd/lib/form'
import Modal from 'antd/lib/modal/Modal';
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserSignIn } from '../api/user-calls';
import { useAuthContext } from '../hooks/AuthProvider/useAuthContext';
import { validatePassword } from '../validation/user-validation';

export const SignInModal = () => {
    const [loading, setLoading] = useState(false);
    const [isWrongEmail, setWrongEmail] = useState(false);
    const [iswrongPassword, setWrongPassword] = useState(false);
    const authContext = useAuthContext();
    const [form] = Form.useForm();
    const navigate = useNavigate();
    useEffect(() => {
        if (authContext.authState) {
            navigate("/home", {replace: true})
        }
    }, [])

    const validateForm = () => {
        setWrongEmail(false);
        setWrongPassword(false);
        form.validateFields()
            .then(values => {
                setLoading(true);
                UserSignIn(values)
                    .then(response => {
                        switch (response.message) {
                            case "wrong password":
                                setWrongPassword(true);
                                setLoading(false);
                                break;
                            case "wrong email":
                                setWrongEmail(true);
                                break;
                            default:
                                if (response.result === "ok") {
                                    authContext.SetAuthState(true);
                                    navigate("/home")
                                    message.success(
                                        {
                                            content: 'Signed in successfully',
                                            duration: 2,
                                            style: {
                                                marginTop: "90vh",
                                            }
                                        }
                                    );
                                }
                        }
                        setLoading(false);
                    });
            })
            .catch(() => setLoading(false));
    }

    return (
        <Modal
            title="Sign-in"
            open={true}
            onCancel={() => {navigate("/home")}}
            destroyOnClose={true}
            centered={true}
            footer={false}
        >
            <Form
                form={form}
                name="basic"
                labelAlign="left"
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 17 }}
                initialValues={{ remember: true }}
                autoComplete="off"
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={
                        [
                            { required: true, message: 'Enter your email!' },
                            { type: "email", message: 'Enter valid email' }
                        ]
                    }
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={
                        [
                            { required: true, message: 'Enter your password!' },
                            { validator: (_, value) => validatePassword(value) }
                        ]
                    }
                >
                    <Input.Password />
                </Form.Item>
                {
                    iswrongPassword ?
                        <Form.Item wrapperCol={{ offset: 8, span: 9 }}>
                            <Alert message="Wrong password" type="error" showIcon />
                        </Form.Item>
                        :
                        <></>
                }
                {
                    isWrongEmail ?
                        <Form.Item wrapperCol={{ offset: 7, span: 10 }}>
                            <Alert message="Wrong email" type="error" showIcon />
                        </Form.Item>
                        :
                        <></>
                }
                <Form.Item wrapperCol={{ offset: 10 }}>
                    <Button type="primary" onClick={validateForm} loading={loading}>
                        Sign-in
                    </Button>
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 7 }}>
                    <span>Don't have an account?</span>
                    <Button type="link" size="small" onClick={ () => navigate("/sign-up") }>Sign-up</Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}
