import React from "react";
import styled from "styled-components";

export default function ButtonSidebar ({ children }) {
    return <>
        <Button>
            { children }
        </Button>
    </>;
}


const Button = styled.button`
    border: none;
    width: 50px;
    height: 50px;
    cursor: pointer;
    transition: color .5s;
    transition: background-color .5s;

    &:hover {
        transform: scale(103%);
    }

    &:active {
        box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
    }
`;
