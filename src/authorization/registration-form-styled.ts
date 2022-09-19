import { Link } from "react-router-dom";
import styled, { keyframes, css } from "styled-components";

const vibration = keyframes`
    25% {
        transform: translateX(2px);
    }
    50% {
        transform: translateX(-2px);
    }
    75% {
        transform: translateX(2px);
    }
    100% {
        transform: translateX(-2px);
    }
` 
const initialAnimation = keyframes`
    from {
        opacity: 0;
        top: 100%;
    }
    to {
        opacity: 1;
        top: 25%;
    }
` 

export const Div = styled.div`
    position: fixed;
    opacity: 0;
    width: 35vw;
    top: 100vh;
    left: 32.5vw;
    opacity: 0;
    animation-name: ${initialAnimation};
    animation-duration: 0.26s;
    animation-fill-mode: forwards;

    :target {
        opacity: 1;
        z-index: 1;
        top: 25vh;
    }

    div {
        color: black;
        font-size: 1rem;
        user-select: none;
        height: 35px;
    }

    .login-pop-up__sign-up--wrong-input {
        position: absolute;
        bottom: 145px;
        left: calc(50% - 3.8rem);
        font-size: 0.85rem;
        color: red;
        user-select: none;
    }

    form {
        box-shadow: rgba(99, 99, 99, 0.4) 2px 2px 4px 2px;        
        border-radius: 3%;
        background-color: white;
        padding: 40px 40px 20px 40px;
        display: grid;
        gap: 30px;
        grid-template-rows: repeat(3, 1fr);
        place-items: center;

        .login-pop-up__sumbit {
            width: 100%;
            height: 35px;
            border: 1px solid rgba(180, 180, 180, 1);
            border-radius: 3px;
            width: 50%;
            transition: 0.2s;
            background-color: black;
            color: white;
            font-size: 1rem;
            cursor: pointer;
            :hover {
                transform: translateY(-3px);
            }
        }
    }

    .login-pop-up__sign-up-labels {
        color: black;
        font-size: 1rem;
        position: relative;
        user-select: none;
        z-index: 2;
    }

    .login-pop-up__sign-up-labels.label-user-name {
        bottom: calc(315px + 0.7rem);
        background-color: white;
        left: 47px;
    }

    .login-pop-up__sign-up-labels.label-email {
        left: calc(47px - 4.735rem);
        bottom: calc(250px + 0.62rem);
        background-color: white;
    }

    .login-pop-up__sign-up-labels.label-password {
        left: calc(47px - 7.2rem);
        bottom: calc(185px + 0.62rem);
        background-color: white;
    }

    @media (max-width: 800px) {
        width: 100%;
        left: 0;
    }
`
export const Input = styled.input`
    width: 100%;
    height: 35px;
    border: 1px solid rgba(180, 180, 180, 1);
    border-radius: 3px;
    
    ${(props: {invalid: boolean}) => {
        if (props.invalid) {
            return css`
                animation: ${vibration} 0.2s;
                border: 2px solid red;
                box-shadow: 0px 0px 1px 1px red;
            `
        } else {
            return css`
                :focus {
                    border: 2px solid rgba(56, 187, 255, 0.8);
                    box-shadow: 0px 0px 1px 1px rgba(56, 187, 255, 0.8);
                }
            `
        }
    }}
`

export const StyledLink = styled(Link)`
    position: fixed;
    top: 0%;
    left: 0%;
    width: 100vw;
    height: 100vh;
    z-index: -1;
    background-color: rgba(0, 0, 0, 0.4);
`