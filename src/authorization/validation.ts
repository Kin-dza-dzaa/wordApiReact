import { UserDataLogin, UserDataRegister } from "../api/user-calls";

export const passwordRegex = new RegExp('(?=.*\\d)(?=.*[A-Z])^[A-Za-z0-9]{8,}$');
export const userNameRegex = new RegExp('(?=[\\w-]*[A-Za-z]{5,})^[\\w-]{6,}$');
export const emailRegex = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$');

export function validateSignIn(userInput: UserDataLogin, setEmailValidation: React.Dispatch<React.SetStateAction<boolean>>, setPasswordValidation: React.Dispatch<React.SetStateAction<boolean>>): boolean {
    const isEmailValid: boolean = emailRegex.test(userInput.email);
    const isPasswordValid: boolean = passwordRegex.test(userInput.password);
    setEmailValidation(!isEmailValid);
    setPasswordValidation(!isPasswordValid);
    if (isEmailValid && isPasswordValid) {
        return true;
    }
    return false;
}

export function validateSignUp(userInput: UserDataRegister, setEmailValidation: React.Dispatch<React.SetStateAction<boolean>>, setUserNameValidation: React.Dispatch<React.SetStateAction<boolean>>, setPasswordValidation: React.Dispatch<React.SetStateAction<boolean>>): boolean {
    const isEmailValid: boolean = emailRegex.test(userInput.email);
    const isUserNameValid: boolean = userNameRegex.test(userInput.user_name);
    const isPasswordValid: boolean = passwordRegex.test(userInput.password);
    setEmailValidation(!isEmailValid);
    setUserNameValidation(!isUserNameValid);
    setPasswordValidation(!isPasswordValid);
    if (isEmailValid && isUserNameValid && isPasswordValid) {
        return true;
    }
    return false;
}