import styled from 'styled-components';

export const Button = styled.button`
    background-color: transparent;
    font-family: 'Atkinson Hyperlegible', sans-serif;
    border-radius: 50px;
    box-shadow: 1px 1px 5px #424242;
    cursor: pointer;
    transition: color .5s;
    transition: background-color .5s;

    @media screen and ( min-width: 1024px) {
        margin: 10px;
        padding: 10px 15px;
        font-size: 1.2rem;
        border: 2px solid #C9ADA7;
    }
    @media screen and (min-width: 1400px) {
        margin: 15px;
        padding: 15px 18px;
        font-size: 1.3rem;
        border: 3px solid #C9ADA7;
    }
    

    &:hover {
        background-color: #C9ADA7;
        color: white;
    }

    &:active {
        transform: scale(96%);
    }
`;