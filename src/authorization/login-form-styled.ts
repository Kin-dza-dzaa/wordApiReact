import { Link } from "react-router-dom";
import styled, { keyframes , css } from "styled-components";

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
    width: 35vw;
    top: 100vh;
    left: 32.5vw;
    opacity: 0;
    animation-name: ${initialAnimation};
    animation-duration: 0.26s;
    animation-fill-mode: forwards;

    @media (max-width: 800px) {
        width: 100%;
        left: 0;
    }

    div {
        font-size: 1rem;
        color: black;
        user-select: none;
        height: 35px;
    }

    form {
        .invalid {
            border: 1px solid red;
            box-shadow: 0px 0px 1px 1px red;
            animation: ${vibration} 0.2s; 
        }
        box-shadow: rgba(99, 99, 99, 0.4) 2px 2px 4px 2px;        
        border-radius: 3%;
        background-color: white;
        padding: 60px 60px 0 60px;
        display: grid;
        gap: 30px;
        grid-template-rows: repeat(3, 1fr);
        place-items: center;

        .login-pop-up__sumbit {
            width: 100%;
            width: 50%;
            height: 35px;
            border: 1px solid rgba(180, 180, 180, 1);
            border-radius: 3px;
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

    .login-pop-up__sign-in-labels {
        color: black;
        font-size: 1rem;
        position: relative;
        user-select: none;
        z-index: 2;
    }

    .label-user-name {
        bottom: calc(230px + 0.6rem);
        background-color: white;
        left: 67px;
    }

    .label-password {
        left: calc(67px - 2.55rem);
        bottom: calc(165px + 0.66rem);
        background-color: white;
    }
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