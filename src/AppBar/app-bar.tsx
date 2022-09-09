import React from 'react';
import { Ul, Label, Input, NavLink } from "./styled-app-bar";

const AppBar = (): JSX.Element => {
  return (
    <React.Fragment>
      <Ul className="app-bar">
        <li>
          <NavLink to="/" className={({ isActive }:{isActive: boolean}) => isActive ? "selected" : undefined }>WordDict</NavLink>
        </li>
        <li>
          <Label className="app-bar__label" htmlFor="animation">Get started</Label>
        </li>
      </Ul>
      <Input type="checkbox" id="animation" name="scales"/>
    </React.Fragment>
  )
}

export default AppBar
