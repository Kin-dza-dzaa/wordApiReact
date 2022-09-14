import React from 'react';
import { queryClient } from '..';
import { UserLogOut } from '../api/user-calls';
import { useAuthContext } from '../hooks/useAuthContext';
import { Ul, StyledLink, NavLink } from "./styled-app-bar";

export const AppBar = (): JSX.Element => {
  const authContext = useAuthContext();
  const LogOut: () => void = (): void => {
    const options: RequestInit  = {
      method: "GET",
      mode: "cors",
      credentials: "include",
    }
    UserLogOut(options)
    .then((response) => {
      if (response.result === "ok") {
        queryClient.invalidateQueries(["user"]);
      }
    });
  }
  return (
    <React.Fragment>
      <Ul className="app-bar">
        <li>
          <NavLink to="/">WordDict</NavLink>
        </li>
        <li>
          {authContext.LogState ? <button onClick={LogOut}>Logout</button> : <StyledLink to='sign-in'><span>Get started</span></StyledLink>}
        </li>
      </Ul>
    </React.Fragment>
  )
}

