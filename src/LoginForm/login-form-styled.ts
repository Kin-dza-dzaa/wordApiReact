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
    width: 35%;
    height: 35%;
    top: 100%;
    left: 32.5%;
    transition: 0.26s;
    z-index: -1;
    @media (max-width: 640px) {
            width: 100%;
            height: 50%;
            left: 0;
    }

    form{
        box-shadow: rgba(99, 99, 99, 0.4) 2px 2px 4px 2px;        
        border-radius: 3%;
        background-color: white;
        padding: 60px;
        display: grid;
        gap: 20px;
        grid-template-rows: repeat(3, 1fr);

        input {
            width: 100%;
            height: 30px;
            border: 1px solid rgba(180, 180, 180, 1);
            border-radius: 3px;
            :invalid {
                animation: ${vibration} 0.2s; 
            }   
            :not(.login-pop-up__sing-up-input):focus {
                border: 2px solid rgba(56, 187, 255, 0.8);
                box-shadow: 0px 0px 1px 1px rgba(56, 187, 255, 0.8);
            }
        }
        .login-pop-up__sing-up-input {
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

    .login-pop-up__labels {
        color: black;
        font-size: 1rem;
        position: relative;
        transition: 0.4s;
        user-select: none;
        z-index: 2;
    }

    .label-user-name {
        bottom: 253.5px;
        background-color: white;
        left: 67px;
    }

    .label-email {
        right: 13.7px;
        bottom: 202px;
        background-color: white;
    }

    .label-password {
        right: 56.5px;
        bottom: 153px;
        background-color: white;
    }

    .login-pop-up__transperent-label {
        z-index: -1;
        cursor: pointer;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.4);
    }
`