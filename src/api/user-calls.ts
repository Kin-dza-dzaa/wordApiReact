export interface UserDataRegister {
  email: string|undefined,
  user_name: string|undefined,
  password: string|undefined,
}

export interface UserDataLogin {
  email: string|undefined,
  password: string|undefined,
}

export const UserSignIn = async function (options: RequestInit): Promise<any> {
  const response: Response = await fetch("http://localhost:8000/user/token", options);
  return response.json();
}

export const UserSignUp = async function (options: RequestInit): Promise<Response> {
  const response: Response = await fetch("http://localhost:8000/user", options);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response;
}

export const UserLogOut = async function (options: RequestInit): Promise<void> {
  const response: Response = await fetch("http://localhost:8000/user/log-out", options);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
}
