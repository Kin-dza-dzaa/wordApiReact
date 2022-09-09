import React from 'react';
import {Div} from './login-form-styled';
import { NavigateFunction, useNavigate } from "react-router-dom";
import { HttpMetaData, UserData } from '../calls/user-calls';

export const LoginForm = () => {
    const navigate: NavigateFunction = useNavigate();
    const Login = (event: React.FormEvent<HTMLFormElement>):void => {
        event.preventDefault()
        const data:FormData = new FormData(event.currentTarget)
        const userData: UserData = {
            email: data.get("email")?.toString(),
            user_name: data.get("user_name")?.toString(),
            password: data.get("password")?.toString(),
        }
        const options: HttpMetaData  = {
            method: "POST",
            mode: "cors",
            headers: [["Content-type", "application/json"]],
            body: JSON.stringify(userData)
        }
        fetch("http://127.0.0.1:8000/users", options
        ).then((response) => response.json() 
        ).then((dataJson) => console.log(dataJson)
        ).catch((err) => console.log(err))
        navigate("/");
    }
    return (
        <Div className="login-pop-up">
            <label className= "login-pop-up__transperent-label" htmlFor='animation'/>
            <form onSubmit={Login}>
                <input type='text' id='user_name' name='user_name' required/>
                <input type='email' id='email' name='email' required/>
                <input type='password' id='password' name='password'/>
                <input type="submit" value="Create account" className="login-pop-up__sing-up-input"></input>
            </form>
            <label className="login-pop-up__labels label-user-name" htmlFor='user_name'>User name</label>
            <label className="login-pop-up__labels label-email" htmlFor='user_name'>Email</label>
            <label className="login-pop-up__labels label-password" htmlFor='user_name'>Password</label>
            <form onSubmit={Login} autoComplete="off">
                <input type='text' id='user_name' name='user_name' pattern='[A-Za-z]{6,}' required/>
                <input type='email' id='email' name='email' required/>
                <input type='password' id='password' name='password' pattern='[0-9]{4,}' required/>
                <input type="submit" value="Create account" className="login-pop-up__sing-up-input"></input>
            </form>
            <label className="login-pop-up__labels label-user-name" htmlFor='user_name'>User name</label>
            <label className="login-pop-up__labels label-password" htmlFor='user_name'>Password</label>
            <div>
                Have an account? <a href='#sign-in'>Log in</a>
            </div>
        </Div>
    )
}
