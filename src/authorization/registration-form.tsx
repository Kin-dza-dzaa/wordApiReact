import React from 'react';
import {Div} from './registration-form-styled';
import { UserDataRegister, UserSignUp } from '../api/user-calls';

export const RegistrationForm = (props: {userState: boolean, setState: React.Dispatch<React.SetStateAction<boolean>>}) => {
    const Login = (event: React.FormEvent<HTMLFormElement>):void => {
        event.preventDefault()
        const data:FormData = new FormData(event.currentTarget)
        const userData: UserDataRegister = {
            email: data.get("email")?.toString().toLowerCase(),
            user_name: data.get("user_name")?.toString(),
            password: data.get("password")?.toString(),
        }
        const options: RequestInit  = {
            method: "POST",
            mode: "cors",
            headers: [["Content-type", "application/json"]],
            body: JSON.stringify(userData),
        }
        UserSignUp(options).then((res) => res.json()).then((data) => console.log(data));
        props.setState(!props.userState);
    }
    return (
        <Div id="sign-up" className="login-pop-up__sign-up">
            <a href='#home' className='login-pop-up__sign-up__transparent-link'></a>
            <form onSubmit={Login}>
                <input type='text' id='user_name' name='user_name' required/>
                <input type='email' id='email' name='email' required/>
                <input type='password' id='password' name='password'/>
                <input type="submit" value="Sign-up" className="login-pop-up__sumbit"></input>
                <div>
                <span>Have an account?</span>
                <a href='#sign-in'>Log in</a>
            </div>
            </form>
            <label className="login-pop-up__sign-up-labels label-user-name" htmlFor='user_name'>User name</label>
            <label className="login-pop-up__sign-up-labels label-email" htmlFor='user_name'>Email</label>
            <label className="login-pop-up__sign-up-labels label-password" htmlFor='user_name'>Password</label>
            
        </Div>
    )
}