import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Div = styled.div`
    wigth: 100px;
    height: 100px;
    background-color: rgba(55, 55, 55, 1);
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;    
    border-radius: 20px;
    display: grid;
    grid-template-rows: 2 1fr 1fr;
    place-items: center;
    span {
        font-size: 1.3rem;
    }
    p {
        font-size: 1 rem;
    }
`

export const StyledLink = styled(Link)`

`