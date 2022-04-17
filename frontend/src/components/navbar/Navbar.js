import React, { useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { AccountCircleOutlined, StraightenRounded, BiotechRounded, BallotOutlined } from '@mui/icons-material';
import { grey } from '@mui/material/colors';

export default function Navbar({ setOptionNav }) {
    const nav = useRef();

    useEffect(() => {
        const option = localStorage.getItem('optionNav') ? localStorage.getItem('optionNav') : 'infoHabits' ;
        setOptionNav(option);
    }, []);

    const changeOptionNav = (newValue) => {
        localStorage.setItem('optionNav', newValue);
        setOptionNav(newValue);
    };

    const scrollNavbar = (dir) => {
        nav.current.scrollBy({
            top: 0,
            left: (dir === 'left') ? -400 : 400 ,
            behavior: 'smooth'
        });
    }

    return (
        <>
        <Container>
            <ButtonScroll orientation={'left'} onClick={ () => scrollNavbar('left') } > <ArrowLeft /> </ButtonScroll>
            <Items ref={nav} >
                <Item onClick={ () => changeOptionNav('infoHabits') } >
                    <AccountCircleOutlined sx={{color: grey[800], fontSize: 40}} />
                    <Tittle>Información y Hábitos</Tittle>
                </Item>
                <Item onClick={ () => changeOptionNav('laboratory') }>
                    <BiotechRounded sx={{color: grey[800], fontSize: 40}} />
                    <Tittle>Laboratorio</Tittle>
                </Item>
                <Item onClick={ () => changeOptionNav('dateAntro') }>
                    <StraightenRounded sx={{color: grey[800], fontSize: 40}} />
                    <Tittle>Datos Antropométricos</Tittle>
                </Item>
                <Item onClick={ () => changeOptionNav('planification') }>
                    <BallotOutlined sx={{color: grey[800], fontSize: 40}} />
                    <Tittle>Planificación</Tittle></Item>
                <Item>4</Item>
                <Item>4</Item>
            </Items>
            <ButtonScroll onClick={ () => scrollNavbar('right') }> <ArrowRight /> </ButtonScroll>
        </Container>
        
    </>
    );
}

const Container = styled.div`
    height: 70px;
    max-width: 96%;
    margin-top: 10px;
    padding: 5px;
    display: flex;
    font-family: 'Asul', sans-serif;
    position: sticky;
`;

const Items = styled.div`
    height: 100%;
    display: flex;
    overflow-x: auto;

    &::-webkit-scrollbar{
        width: 0;
        height: 0;
    }
`;

const Item = styled.div`
    min-width: 200px;
    height: 92%;
    margin: 0px 14px;
    padding: 0px 10px;
    display: flex;
    align-items: center;
    background: #FFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;

    &:hover{
        background-color: #F4A261;
        cursor: pointer;
    }
`;

const Tittle = styled.p`
    padding-left: 5px;
    color: #424242;
`;

const ButtonScroll = styled.button`
    height: 93%;
    width: 30px;
    margin: 0px 5px;
    border: none;
    position: relative;
    ${({orientation}) => {
        switch (orientation) {
            case "left":
                return css`
                    border-radius: 10px 0px 0px 10px;
                `;
            default:
                return css`
                    border-radius: 0px 10px 10px 0px;
                `;
        }
    }}
    background: rgba(34, 71, 109, 0.2);
    filter: invert();

    &:hover{
        background: rgba(34, 71, 109, 0.8);
    }
`;

const Arrow = styled.div`
    height: 50px;
    width: 50px;
    background-color: black;
    margin-left: 5px;

`;

const ArrowRight = styled(Arrow)`
    clip-path: polygon(0 0, 0% 100%, 20% 50%);
`;

const ArrowLeft = styled(Arrow)`
    clip-path: polygon(20% 0, 20% 100%, 0% 50%);
`;