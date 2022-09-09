import styled from 'styled-components';
import { NavLink as Link } from "react-router-dom";

export const Ul = styled.ul`
    height: 10vh;
    width: 100vw;
    list-style: none;
    display: grid;
    align-items: center;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    @media (max-width: 640px) {
        .app-bar__label {
            display: none;
        }
    }
`

export const NavLink = styled(Link)`
    margin-left: 5vw;
    font-size: 1.65rem;
`

export const Input = styled.input`
    display: none;
    :checked~.login-pop-up {
        opacity: 1;
        top: 22%;
    }
    body &:checked~.login-pop-up {
        z-index: 1;
    }
`

export const Label = styled.label`
    position: fixed;
    font-size: 1.4rem;
    bottom: 91.5vh;
    left: 73vw;
    cursor: pointer;
    padding: 4px 8px 4px 8px; 
    border-radius: 25px;
    background: rgba(35,105,237, 1);
    user-select: none;
    transition: 0.2s;
    :hover {
        transform: translateY(-3px);
    }
`





