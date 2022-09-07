import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import { Ul, Label, Input, Span } from "./styled-app-bar";

interface appBarProps {
  toggleAnimation():void
}

const AppBar = (props:appBarProps): JSX.Element => {
  return (
    <React.Fragment>
      <Ul className="app-bar">
        <li>
          <NavLink to="/" className={({ isActive }) => isActive ? "selected" : undefined }><Span className="app-bar__home-page">WordDict</Span>
          </NavLink>
        </li>
        <li>
          <Input onClick={props.toggleAnimation} type="checkbox" id="animation" name="scales"/>
          <Label className="app-bar__label" htmlFor="animation">Get started</Label>
        </li>
      </Ul>
    </React.Fragment>
  )
}

export default AppBar
