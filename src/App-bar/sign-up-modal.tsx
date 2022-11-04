import { Input, Alert, Button, message } from 'antd';
import Form from 'antd/lib/form'
import Modal from 'antd/lib/modal/Modal';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserSignUp } from '../api/user-calls';
import { useAuthContext } from '../hooks/AuthProvider/useAuthContext';
import { validatePassword, validateUserName } from '../validation/user-validation';

export const SignUpModal = () => {
    const [loading, setLoading] = useState(false);
    const [isUserExists, setUserExists] = useState(false);
    const [form] = Form.useForm();
    const authContext = useAuthContext();
    const navigate = useNavigate();
    useEffect(() => {
        if (authContext.authState) {
            navigate("/home", {replace: true})  
        }
    }, [])

    const validateForm = () => {
        setUserExists(false);
        form.validateFields()
            .then(values => {
                setLoading(true);
                UserSignUp(values)
                    .then(response => {
                        switch (response.message) {
                            case "user already exists":
                                setUserExists(true);
                                break;
                            default:
                                if (response.result === "ok") {
                                    navigate("/home");
                                    message.success(
                                        {
                                            content: 'Signed up successfully, check your email',
                                            duration: 4,
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
            title="Sign-up"
            open={true}
            onCancel={() => navigate("/home")}
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
                    label="Username"
                    name="user_name"
                    rules={
                        [
                            { required: true, message: 'Enter your email!' },
                            { validator: (_, value) => validateUserName(value) }
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
                    isUserExists ?
                        <Form.Item wrapperCol={{ offset: 7, span: 10 }}>
                            <Alert message="User already exists" type="error" showIcon />
                        </Form.Item>
                        :
                        <></>
                }
                <Form.Item wrapperCol={{ offset: 10 }}>
                    <Button type="primary" onClick={validateForm} loading={loading}>
                        Sign-up
                    </Button>
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8 }}>
                    <span>Have an account?</span>
                    <Button type="link" size="small" onClick={() => navigate("/sign-in") }>Sign-in</Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}
