import React from 'react';
import styled from 'styled-components';
import { Alert, AlertTitle  } from "@mui/material";
import { Modal, Container } from './Modal';

export default function FormAlert({ setAlertShow, setSaveForm }) {
    return <>
        <Modal>
            <Container>
                <Alert
                    severity="warning" 
                    onClose={() => { setAlertShow(false) }}>
                        <AlertTitle>Warning</AlertTitle>
                        <Content>
                            This is a success alert — check it out!
                            <ButtonAcept onClick={ () => {
                                setSaveForm(true);
                                setAlertShow(false);
                            } }>
                                UNDO
                            </ButtonAcept>
                        </Content>
                </Alert>
            </Container>
        </Modal>
    </>
}

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonAcept = styled.button`
    margin-top: 1rem;
   width: 80px;
`;