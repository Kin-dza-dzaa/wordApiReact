import styled, { keyframes } from "styled-components";

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

export const Div = styled.div`
    position: fixed;
    opacity: 0;
    width: 35vw;
    top: 100vh;
    left: 32.5vw;
    transition: 0.26s;
    z-index: -1;

    .login-pop-up__sign-up__transparent-link {
        z-index: -1;
        cursor: pointer;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.4);
    }

    :target {
        opacity: 1;
        z-index: 1;
        top: 25vh;
    }

    @media (max-width: 800px) {
            width: 100%;
            left: 0;
    }

    div {
        color: black;
        font-size: 1rem;
        user-select: none;
        height: 35px;
    }

    form {
        box-shadow: rgba(99, 99, 99, 0.4) 2px 2px 4px 2px;        
        border-radius: 3%;
        background-color: white;
        padding: 60px 60px 0 60px;
        display: grid;
        gap: 30px;
        grid-template-rows: repeat(3, 1fr);
        place-items: center;

        input {
            width: 100%;
            height: 35px;
            border: 1px solid rgba(180, 180, 180, 1);
            border-radius: 3px;
            :invalid {
                animation: ${vibration} 0.2s; 
            }   
            :not(.login-pop-up__sumbit):focus {
                border: 2px solid rgba(56, 187, 255, 0.8);
                box-shadow: 0px 0px 1px 1px rgba(56, 187, 255, 0.8);
            }
        }
        .login-pop-up__sumbit {
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
        bottom: calc(295px + 0.7rem);
        background-color: white;
        left: 67px;
    }

    .login-pop-up__sign-up-labels.label-email {
        left: calc(67px - 4.735rem);
        bottom: calc(230px + 0.62rem);
        background-color: white;
    }

    .login-pop-up__sign-up-labels.label-password {
        left: calc(67px - 7.2rem);
        bottom: calc(165px + 0.62rem);
        background-color: white;
    }
}
`