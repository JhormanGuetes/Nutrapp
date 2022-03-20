import styled from 'styled-components';

export const Submit = styled.button`
    background-color: #F08080;
    font-family: 'Baloo 2';
    border-radius: 50px;
    box-shadow: 3px 6px 4px rgba(0, 0, 0, 0.25);
    border: 0.1em solid #E03F3F;
    color: white;
    cursor: pointer;
    transition: color .5s;
    transition: background-color .5s;
    font-size: ${ ({fSize}) => fSize ? fSize : 16 }px;

    @media screen and ( min-width: 1024px) {
        margin: 1.1em;
        padding: 0.2em 1.8em;
        font-size: 1.2em;
    }
    @media screen and (min-width: 1400px) {
        margin: 1.2em;
        padding: 0.3em 1.9em;
        font-size: 1.32em;
    }

    &:hover {
        background-color: #F1F1F1;
        color: black;
    }

    &:active {
        transform: scale(96%);
    }
`;