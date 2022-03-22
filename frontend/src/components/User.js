import React, { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import styled from 'styled-components';
import Sidebar from './sidebar/Sidebar';
import Clients from './Clients';
import Profile from './Profile';
import UserHome from './UserHome';
import Client from './Client';

function User() {
    const [opcionSidebar, setOpcionSidebar] = useState();
    const { client } = useContext(UserContext);
    
    return ( 
        <>
            <Container>
                <Sidebar setOpcion={setOpcionSidebar} />
                <Content>
                    {(opcionSidebar === 'profile' && !client) && <Profile />}
                    {(opcionSidebar === 'userHome' && !client) && <UserHome />}
                    {(opcionSidebar === 'clients' && !client) && <Clients />}
                    {client && <Client />}
                </Content>
            </Container>
            
        </>
     );
}

export default User;

const Container = styled.div`
    display: flex;
    height: 100vh;
    width: 100vw;
    background-color: #FAFAFA;
`;

const Content = styled.div`
    height: 100vh;
    width: 95vw;
`;