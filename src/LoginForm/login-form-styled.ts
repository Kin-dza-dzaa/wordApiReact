import styled from "styled-components";

export const Div = styled.div`
    display: grid;
    position: absolute;
    transform: scale(0);
    opacity: 0;
    left: 83.8vw;
    top: 4vh;
    width: 20vw;
    height: 20vh;
    padding: 20px;
    backgruond-color:red;
    transition: 0.7s;
    &.opened {
        transform: scale(1) rotateX(360deg) rotateY(360deg);
        opacity: 1;
        left: calc(40vw);
        top: calc(40vh);
    }
    &.closed {
        transform: sclae(0);
        opacity: 0;
        left: 83.8vw;
        top: 4vh; 
    }
`