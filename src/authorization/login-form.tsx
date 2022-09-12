import {Div} from './login-form-styled';
import { UserDataLogin, UserSignIn } from '../api/user-calls';

export const LoginForm = (props: {userState: boolean, setState: React.Dispatch<React.SetStateAction<boolean>>}) => {
    const Login = (event: React.FormEvent<HTMLFormElement>):void => {
        event.preventDefault()
        const userInput:FormData = new FormData(event.currentTarget)
        const userData: UserDataLogin = {
            email: userInput.get("user_name")?.toString().toLowerCase(),
            password: userInput.get("password")?.toString(),
        }
        const options: RequestInit = {
            method: "POST",
            credentials: "include",
            headers: [["Content-type", "application/json"]],
            body: JSON.stringify(userData)
        }
        UserSignIn(options).then(
            (res) => {
                if (res.result === "error") {
                    alert('wrong password');
                } else {
                    alert('done');
                    props.setState(!props.userState)
                }
            }
        )
    }

    return (
        <Div id="sign-in" className="login-pop-up__sign-in">
            <a href='#' className='login-pop-up__sign-in__transparent-link'></a>
            <form onSubmit={Login}>
                <input type='text' id='user_name' name='user_name' required/>
                <input type='password' id='password' name='password'/>
                <input type="submit" value="Sign-in" className="login-pop-up__sumbit"></input>
                <div>
                <span>Don't have an account?</span>
                <a href='#sign-up'>Registration</a>
            </div>
            </form>
            <label className="login-pop-up__sign-in-labels label-user-name" htmlFor='user_name'>Email</label>
            <label className="login-pop-up__sign-in-labels label-password" htmlFor='user_name'>Password</label>
        </Div>
    )
}
