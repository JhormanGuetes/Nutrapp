import React, { useContext } from 'react';
import { UserContext, addClientSessionStorage } from '../context/UserContext';
import styled from 'styled-components';
import { PersonRounded } from '@mui/icons-material';
import { grey } from '@mui/material/colors';

export default function ClientCard ({ id, name, lastName, sex }) {
    const { setClient } = useContext(UserContext);

    const addClient = () => {
        addClientSessionStorage(id, sex);
        setClient({id: id, sex: sex});
    }

    return ( 
    <>
        <Card onClick={addClient}>
            <PersonRounded sx={{ fontSize: 150, color: grey[800] }} />
            <ContentName>
                <Name>{name} {lastName}</Name>
            </ContentName>
            
        </Card>
    </>
     );
}

const Card = styled.article`
    margin: 1.5em auto;
    padding-bottom: 1.5em;
    width: 13em;  
    text-align: center;
    border-radius: 1em;
    background-color: #EEEEEE;
    cursor: pointer;

    &:hover{
        transform: scale(104%);
    }
`;

const ContentName = styled.div`
    width: 100%;
    padding-top: .5em;
    box-shadow: inset 0px 2px 2px rgba(0, 0, 0, 0.25);
    display: flex;
    justify-content: center;
`;

const Name = styled.p`
    padding-top: 6px;
    font-size: 1em;
    font-weight: bold;
    font-family: 'Atkinson Hyperlegible', sans-serif;
    color: #545454;
`;

