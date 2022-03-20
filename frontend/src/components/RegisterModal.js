//react
import React, { useState, useContext, useRef } from 'react';

//components
import { UserContext, addSessionStorage } from '../context/UserContext';
import { Modal, Container, Delete, Form, Tittle, GroupInput, Label, Input, ContainerSubmit, ErrorMessage } from './Modal';
import { Submit } from './Submit';

//funtions
import validarFormulario from './validaciones/validadFormulario';

//files
import close from '../images/close_black_24dp.svg'

export default function RegisterModal( props ) {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [errorMessage, setErrorMessage] = useState();
    const { setUser } = useContext(UserContext);
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();


    const deleteInputsValues = () => {
        nameRef.current.value = '';
        emailRef.current.value = '';
        passwordRef.current.value = '';
    }

    const createUser = () => {
        return { name: name,
                email: email,
                password: password, }
    }

    const logup = async (e) => {
        e.preventDefault();
        const validacion = validarFormulario('registro', email, password, name);
        if (validacion.ok) {
            const usuario = createUser();

            const res = await fetch( 'http://localhost:3001/api/v1/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(usuario)} );
            const data = await res.json();
            
            if(data.ok){
                addSessionStorage(name, email, data.user._id);
                setUser({id: data.user._id, name: name, email: email});
                deleteInputsValues();
                window.location.href = './user';
            } else{
                setErrorMessage(data.message);
            }
        } else{
            setErrorMessage(validacion.mensaje);
        }
    };

    return (
        <>
            <Modal fSize={14}>
            <Container>
            <Delete onClick={() => props.setRegisterModal(false)}>
              <img src={close} alt='close' />
            </Delete>
                <Tittle>REGISTRATE</Tittle>
                <Form onSubmit={logup}>
                    <GroupInput>
                        <Label>Nombre Completo</Label>
                        <Input type='text' name='name' ref={nameRef}
                        onChange={(event) => {setName(event.target.value)}} />
                    </GroupInput>
                    <GroupInput>
                        <Label>Correo</Label>
                        <Input type='email' name='correo' ref={emailRef}
                        onChange={(event) => {setEmail(event.target.value.toLocaleLowerCase())}} />
                    </GroupInput>
                        <GroupInput>
                        <Label>Contraseña</Label>
                        <Input type='password' name='password' ref={passwordRef}
                        onChange={(event) => {setPassword(event.target.value)}} />
                    </GroupInput>
                    <ErrorMessage>{errorMessage}</ErrorMessage>
                    <ContainerSubmit>
                        <Submit fSize={14} type='submit'>ENTRAR</Submit>
                    </ContainerSubmit>
                </Form>
                </Container>
            </Modal>
        </>
  );
}


