export interface UserDataRegister {
  email: string,
  user_name: string,
  password: string,
}

export interface UserDataLogin {
  email: string,
  password: string,
}

const OptionsToken: RequestInit = {
  method: "GET",
  mode: "cors",
  credentials: "include",
}

export const UserSignIn = async function (userInput: { email: string, password: string }): Promise<any> {
  userInput.email = userInput.email.toLocaleLowerCase();
  const options: RequestInit = {
    method: "POST",
    mode: "cors",
    credentials: "include",
    body: JSON.stringify(userInput),
  }
  const response: Response = await fetch("http://localhost:8001/user/auth", options);
  const XscrfToken = response.headers.get("X-Csrf-Token")
  if (XscrfToken) {
    sessionStorage.setItem("X-Csrf-Token", XscrfToken);
  }
  return response.json();
}

export const UserSignUp = async function (userInput: { email: string, user_name: string, password: string }): Promise<any> {
  userInput.email = userInput.email.toLocaleLowerCase();
  const options: RequestInit = {
    method: "POST",
    mode: "cors",
    body: JSON.stringify(userInput),
  }
  const response: Response = await fetch("http://localhost:8001/user", options);
  return response.json();
}

export const UserLogOut = async function (): Promise<any> {
  const response: Response = await fetch("http://localhost:8001/user/logout", OptionsToken);
  return response.json();
}

export const UserUpdateToken = async function (): Promise<any> {
  const response: Response = await fetch("http://localhost:8001/user/token", OptionsToken);
  const XscrfToken = response.headers.get("X-Csrf-Token")
  if (XscrfToken) {
    sessionStorage.setItem("X-Csrf-Token", XscrfToken);
  }
  return response.json();
}

export const UserVerify = async function (verificationCode: string): Promise<any> {
  const options: RequestInit = {
    method: "POST",
    mode: "cors",
    credentials: "include",
  }
  const response: Response = await fetch("http://localhost:8001/user/verify/" + verificationCode, options);
  const XscrfToken = response.headers.get("X-Csrf-Token")
  if (XscrfToken) {
    sessionStorage.setItem("X-Csrf-Token", XscrfToken);
  }
  return response.json();
}
