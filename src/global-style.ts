import {createGlobalStyle} from "styled-components"

export const GlobalStyle =  createGlobalStyle`
*{
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
}

body {
    background: rgba(32, 32, 32, 1);
    font-family: 'Roboto', sans-serif;
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
    color: rgba(65, 23, 255, 1);
    text-decoration: none;
}

@media (max-width: 640px) {
    html { font-size: 12px; }
}
`