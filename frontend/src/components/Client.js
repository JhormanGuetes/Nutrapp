import React, { useState } from 'react';
import styled from 'styled-components';
import Navbar from './navbar/Navbar';
import InfoHabits from './client/InfoHabits';
import Laboratory from './client/Laboratory';

export default function Client() {
    const [optionNav, setOptionNav] = useState();

    return <>
        <ContainerNavbar>
            <Navbar setOptionNav={setOptionNav} />
        </ContainerNavbar>
            
        <Content>
            { optionNav === 'infoHabits' && <InfoHabits />}
            { optionNav === 'laboratory' && <Laboratory />}
        </Content>
    </>;
}

const ContainerNavbar = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`;

const Content = styled.div`
    width: 100%;
    height: calc(100% - 90px);
`;