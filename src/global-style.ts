import {createGlobalStyle} from "styled-components"

export const GlobalStyle =  createGlobalStyle`
*{
    margin: 0;
    padding: 0;
    outline:0;
    box-sizing:border-box;
}

body {
    background: rgb(12, 12, 12, 0.93);
    font-family: 'Ubuntu', sans-serif; 
    color: white;  
    min-height: 100vh;
}

hmtl {
    font-size: 16.5px;
}

#root{
    margin:0 auto;
}

a:link, a:visited {
    color: blue;
    text-decoration: none;
}

@media (max-width: 640px) {
html { font-size: 12px; }
}
`