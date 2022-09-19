import {Div, StyledLink, Input} from './login-form-styled';
import { UserDataLogin, UserSignIn } from '../api/user-calls';
import { Link, useNavigate } from 'react-router-dom';
import { validateSignIn } from './validation';
import { useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';

export const LoginForm = () => {
    const authContext = useAuthContext();
    const navigation = useNavigate();
    const [ivalidEmail, setEmailValidation] = useState(false);
    const [invalidPassword, setPasswordValidation] = useState(false);
    const [apiRejected, setRejection] = useState(false);
    const Login = (event: React.FormEvent<HTMLFormElement>):void => {
        event.preventDefault()
        const userInput:FormData = new FormData(event.currentTarget)
        const userData: UserDataLogin = {
            email: userInput.get("user_name")?.toString().toLowerCase() || "",
            password: userInput.get("password")?.toString() || "",
        }
        if (validateSignIn(userData, setEmailValidation, setPasswordValidation)) {
            const options: RequestInit = {
                method: "POST",
                credentials: "include",
                headers: [["Content-type", "application/json"]],
                body: JSON.stringify(userData),
            }
            UserSignIn(options)
            .then((response) => {
                if (response.result === "ok") {
                    authContext.setLogState(true);
                    navigation("/", {replace: true});
                } else {
                    setEmailValidation(true);
                    setPasswordValidation(true);
                    setRejection(true);
                    return;
                }
            });
        }
    }
    return (
        <Div className="login-pop-up__sign-in">
            <StyledLink to={'/'}></StyledLink>
            <form onSubmit={Login}>
                <Input type='text' id='user_name' name='user_name' invalid={ivalidEmail}/>
                <Input type='password' id='password' name='password' invalid={invalidPassword}/>
                <input type="submit" value="Sign-in" className="login-pop-up__sumbit"></input>
                <div>
                    <span>Don't have an account?</span>
                    <Link to={'/sign-up'}>Sign-up</Link>
                </div>
            </form>
            <label className="login-pop-up__sign-in-labels label-user-name" htmlFor='user_name'>Email</label>
            <label className="login-pop-up__sign-in-labels label-password" htmlFor='user_name'>Password</label>
            {apiRejected ? <span className='login-pop-up__sign-in--wrong-input'>Wrong email or password</span> : <></>}
        </Div>
    )
}
