//react
import React, { useState } from 'react';
import styled from 'styled-components';

//components
import { Button } from './Button';
import SessionModal from './SessionModal';
import RegisterModal from './RegisterModal';

//files
import fondo from '../images/img1.jpg';

export default function Home() {
    const [sesionModal, setSessionModal] = useState(false);
    const [registerModal, setRegisterModal] = useState(false);

    return ( 
        <>
            <ContainerHome fluid >
                <BgImg src={fondo} />
                <GradientBox />
                <ContentBox>
                    <Tittle>Software especializado para nutricionistas</Tittle>
                    <Button onClick={(e)=> setSessionModal(true)}>INICIAR SESIÓN</Button>
                    <Button onClick={(e)=> setRegisterModal(true)}>REGISTRARSE</Button>
                </ContentBox>
                { sesionModal && <SessionModal setSesionModal={setSessionModal} /> }
                { registerModal && <RegisterModal setRegisterModal={setRegisterModal} /> }
            </ContainerHome>
        </>
     );
}

const ContainerHome = styled.div`
    background: linear-gradient(#DEE9ED, #C9D6DC);
    height: 100vh;
    position: relative;
`;

const BgImg = styled.img`
    height: 100vh;
    width: 100%;
    position: relative;
    object-fit: cover;
    transform: scaleX(-1);
`;

const GradientBox = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 40%;
    background: linear-gradient(90deg, #C2C5C770 5%, rgba(243, 242, 242, 0) 70%);
`;

const ContentBox = styled.div`
    height: auto;
    width: 50%;
    position: absolute;
    top: 20%;
    right: 5%;
    padding: 0% 3% 2% 0%;
    background-color: rgba(255, 255, 255, 0.50);
    border-radius: 20px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    text-align: right;
`;

const Tittle = styled.span`
    display: block;
    font-family: 'Aleo', serif;
    font-weight: bold;
    margin: 6% 0%;
    color: #D1A991;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

    @media screen and ( min-width: 1024px) {
        font-size: 4rem;
    }
    @media screen and (min-width: 1400px) {
        font-size: 5rem;
    }
`;