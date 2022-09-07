import {createGlobalStyle} from "styled-components"

export const GlobalStyle =  createGlobalStyle`
*{
    margin: 0;
    padding: 0;
    outline:0;
    box-sizing:border-box;
}

body {
    background: rgb(12,12,12);
    font-family: 'Ubuntu', sans-serif; 
    color: white;  
    min-height: 100vh;
}

#root{
    margin:0 auto;
}

a:link, a:visited {
    color: blue;
    text-decoration: none;
}

@media (max-width: 640px) { 
    .app-bar__label {
        display: none;
    }
}
`