import styled from 'styled-components';
import { NavLink as Link } from "react-router-dom";

export const Ul = styled.ul`
    height: 10vh;
    width: 100vw;
    list-style: none;
    display: grid;
    align-items: center;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
`

export const NavLink = styled(Link)`

`

export const Span = styled.span`
    margin-left: 5vw;
`

export const Input = styled.input`
    display: none;
`

export const Label = styled.label`
    margin: 0vw 0vw 0vw 34vw;
    cursor: pointer;
    padding: 4px 8px 4px 8px; 
    border-radius: 25px;
    background: rgba(35,105,237, 1);
    user-select: none;
`





