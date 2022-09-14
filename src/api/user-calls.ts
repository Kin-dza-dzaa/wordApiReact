export interface UserDataRegister {
  email: string,
  user_name: string,
  password: string,
}

export interface UserDataLogin {
  email: string,
  password: string,
}

export const UserSignIn = async function (options: RequestInit): Promise<any> {
  const response: Response = await fetch("http://localhost:8000/user/token", options);
  return response.json();
}

export const UserSignUp = async function (options: RequestInit): Promise<any> {
  const response: Response = await fetch("http://localhost:8000/user", options);
  return response.json();
}

export const UserLogOut = async function (options: RequestInit): Promise<any> {
  const response: Response = await fetch("http://localhost:8000/user/log-out", options);
  return response.json();
}

export const UserCheck = async function (options: RequestInit): Promise<any> {
  const response: Response = await fetch("http://localhost:8000/user/check", options);
  return response.json();
}
