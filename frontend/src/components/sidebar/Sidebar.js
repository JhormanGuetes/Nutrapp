import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { UserContext } from '../../context/UserContext';
import { HomeRounded, GroupRounded, LoginOutlined } from '@mui/icons-material';
import { grey } from "@mui/material/colors";
import imgProfile from '../../images/imgPerfil.jpg';

export default function Sidebar( { setOpcion} ) {
    const { setUser } = useContext(UserContext);

    useEffect(() => {
        const optionSidebar = sessionStorage.getItem('optionSidebar') ? sessionStorage.getItem('optionSidebar') : 'userHome' ;
        setOpcion(optionSidebar);
    }, []);

    const changeOption = (optionName) => {
        sessionStorage.setItem('optionSidebar', optionName);
        setOpcion(optionName);
    }

    const logout = () => {
        sessionStorage.clear();
        setUser(null);
        window.location.href = './';
    }

    return <>
        <Container>
            <UserProfile onClick={() => changeOption('profile')}>
                <ImageProfile src={imgProfile} />
            </UserProfile>
            <Opcions>
                <ButtonSidebar onClick={() => changeOption('userHome') }>
                    <HomeRounded sx={{ color: grey[50], fontSize: 36 }} />
                </ButtonSidebar>
                <ButtonSidebar onClick={() => changeOption('clients')}>
                    <GroupRounded sx={{ color: grey[50], fontSize: 36 }} />
                </ButtonSidebar>
            </Opcions>
            <LogoutButon>
                <ButtonSidebar onClick={logout }>
                    <LoginOutlined sx={{ color: grey[50], fontSize: 36 }} />
                </ButtonSidebar>
            </LogoutButon>
        </Container>
    </>;
}

const Container = styled.aside`
    width: 5vw;
    height: 100vh;
    background-color: #D1A991;
    border-radius: 0rem 1rem 1rem 0rem ;
    display: flex;
    flex-direction: column;
`;


const ButtonSidebar = styled.button`
    background-color: transparent;
    border: none;
    width: 100%;
    margin-top: .6em;
    height: 50px;
    cursor: pointer;
    transition: color .5s;
    transition: background-color .5s;

    &:hover {
        transform: scale(130%);
    }
`;

const UserProfile = styled.div`
    width: 100%;
    flex: 5%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid white;
`;

const ImageProfile = styled.img`
    width: 70%;
    height: 50%;
    margin: .6rem 0rem;
    border: 3px solid white;
    border-radius: 2rem;
    object-fit: cover;

    &:hover {
        transform: scale(103%);
    }
`;

const Opcions = styled.div`
    flex: 90%;
`;

const LogoutButon = styled.div`
    border-top: 1px solid white;
    flex: 5%;
`;