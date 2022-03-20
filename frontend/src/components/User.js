import React, { useState } from 'react';
import styled from 'styled-components';
import Sidebar from './sidebar/Sidebar';
import Clients from './Clients';
import Profile from './Profile';
import UserHome from './UserHome';

function User() {
    const [opcion, setOpcion] = useState();

    

    return ( 
        <>
            <Container>
                <Sidebar setOpcion={setOpcion} />
                <Content>
                    {opcion === 'profile' && <Profile />}
                    {opcion === 'userHome' && <UserHome />}
                    {opcion === 'clients' && <Clients />}
                    {opcion === 'client' && <Clients />}
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