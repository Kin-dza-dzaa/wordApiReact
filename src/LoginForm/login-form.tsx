import React from 'react';
import {Div} from './login-form-styled';
import { NavigateFunction, useNavigate } from "react-router-dom";

interface loginFormProps {
    animationState:boolean,
}

export const LoginForm = (props:loginFormProps) => {
    const navigate: NavigateFunction = useNavigate();
    const Login = (event: React.FormEvent<HTMLFormElement>):void => {
        event.preventDefault()
        const data:FormData = new FormData(event.currentTarget)
        data.forEach(element => {
            console.log(element)
        });
        navigate("/");
}
    return (
        <Div className={props.animationState ? "opened" : "closed"}>
            <form onSubmit={Login}>
                <label htmlFor='login'>Login: </label>
                <label htmlFor='email'>Login: </label>
                <label htmlFor='password'>Login: </label>
                <input type='text' id='login' name='login' pattern='[A-Za-z]{6,}'/>
                <input type='email' id='email' name='email'/>
                <input type='password' id='password' name='password' pattern='[A-Za-z]{6,}'/>
                <input type="submit" value="Submit"></input>
            </form>
        </Div>
    )
}
