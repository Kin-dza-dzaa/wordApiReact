import { useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { UserLogOut } from '../api/user-calls';
import { Ul, A, NavLink } from "./styled-app-bar";

export const AppBar = (props: {userState: boolean, setState: React.Dispatch<React.SetStateAction<boolean>>}): JSX.Element => {
  const LogOut: () => void = (): void => {
    const options: RequestInit  = {
      method: "GET",
      mode: "cors",
      credentials: "include",
    }
    UserLogOut(options);
    const queryClient = useQueryClient();
    queryClient.invalidateQueries(["words"]);
    props.setState(!props.userState);
  }
  return (
    <React.Fragment>
      <Ul className="app-bar">
        <li>
          <NavLink to="/" className={({ isActive }:{isActive: boolean}) => isActive ? "selected" : undefined }>WordDict</NavLink>
        </li>
        <li>
          {!props.userState ? <A href='#sign-in'><span>Get started</span></A> : <button onClick={ LogOut }>Log out</button>}
        </li>
      </Ul>
    </React.Fragment>
  )
}

