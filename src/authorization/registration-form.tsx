import React, { useState } from 'react';
import { Div, StyledLink, Input } from './registration-form-styled';
import { UserDataRegister, UserSignUp } from '../api/user-calls';
import { Link, useNavigate } from 'react-router-dom';
import { validateSignUp } from './validation';

export const RegistrationForm = () => {
    const navigation = useNavigate();
    const [ivalidEmail, setEmailValidation] = useState(false);
    const [invalidUserName, setUserNameValidation] = useState(false);
    const [invalidPassword, setPasswordValidation] = useState(false);
    const [apiRejected, setRejection] = useState(false);
    const Login = (event: React.FormEvent<HTMLFormElement>):void => {
        event.preventDefault()
        const data:FormData = new FormData(event.currentTarget)
        const userData: UserDataRegister = {
            email: data.get("email")?.toString().toLowerCase() || "",
            user_name: data.get("user_name")?.toString() || "",
            password: data.get("password")?.toString() || "",
        }
        const options: RequestInit  = {
            method: "POST",
            mode: "cors",
            headers: [["Content-type", "application/json"]],
            body: JSON.stringify(userData),
        }
        if (validateSignUp(userData, setEmailValidation, setUserNameValidation, setPasswordValidation)) {
            UserSignUp(options)
                .then((res) => {
                    if (res.result === "ok") {
                        navigation("/", {replace: true});
                    } else {
                        setRejection(true);
                        setEmailValidation(true);
                        setUserNameValidation(true);
                        return;
                    }
                });
        }
    }
    return (
        <Div id="sign-up" className="login-pop-up__sign-up">
            <StyledLink to='/'></StyledLink>
            <form onSubmit={Login}>
                <Input type='text' id='user_name' name='user_name' invalid={invalidUserName}/>
                <Input type='text' id='email' name='email' invalid={ivalidEmail}/>
                <Input type='password' id='password' name='password' invalid={invalidPassword}/>
                <input type="submit" value="Sign-up" className="login-pop-up__sumbit"></input>
                <div>
                    <span>Have an account?</span>
                    <Link to={'/sign-in'}>Sign-in</Link>
                </div>
            </form>
            <label className="login-pop-up__sign-up-labels label-user-name" htmlFor='user_name'>User name</label>
            <label className="login-pop-up__sign-up-labels label-email" htmlFor='email'>Email</label>
            <label className="login-pop-up__sign-up-labels label-password" htmlFor='password'>Password</label>
            {apiRejected ? <span className='login-pop-up__sign-up--wrong-input'>User already exists</span> : <></>}
        </Div>
    )
}