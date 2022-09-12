import styled from 'styled-components';
import { NavLink as Link } from "react-router-dom";

export const Ul = styled.ul`
    height: 10vh;
    width: 100vw;
    list-style: none;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    align-items: center;
    button {
        font-size: 1rem;
        padding: 5px 8px 5px 8px;
        background-color: black;
        color: white;
        border-radius: 10px;
        border: 0;
        box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
        cursor: pointer;
        margin-left: calc(100% - 100px);
    }
`

export const NavLink = styled(Link)`
    margin-left: 5vw;
    font-size: 1.65rem;
`

export const A = styled.a`
    display: inline-block;
    margin-left: calc(100% - 130px);
    cursor: pointer;
    padding: 4px 8px 4px 8px; 
    border-radius: 25px;
    background: rgba(35,105,237, 1);
    user-select: none;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
    transition: 0.2s;    
    span {
        color: white;
        font-size: 1.3rem;
    }
    :hover {
        transform: translateY(-3px);
    }
    @media (max-width: 240px) {
        display: none;
    }
`





