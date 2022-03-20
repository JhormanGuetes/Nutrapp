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

export default function SessionModal(props) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const { setUser } = useContext(UserContext);
  const emailRef = useRef();
  const passwordRef = useRef();


  const deleteInputsValues = () => {
    emailRef.current.value = '';
    passwordRef.current.value = '';
  }

  const createUser = () => {
    return { email: email, password: password, }
  }

  const login = async (e) => {
    e.preventDefault();
    const validacion = validarFormulario('sesion', email, password);
    if (validacion.ok) {
      const usuario = createUser();

      const res = await fetch('http://localhost:3001/api/v1/auth', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(usuario) });
      const data = await res.json();
      if (data.ok) {
        addSessionStorage(data.user.name, email, data.user._id);
        setUser({ id: data.user._id, name: data.user.name, email: email });
        deleteInputsValues();
        window.location.href = './user';

      } else {
        setErrorMessage(data.message);
      }
    } else {
      setErrorMessage(validacion.mensaje);
    }
  }


  return (
    <>
      <Modal fSize={14}>
        <Container>
          <Delete onClick={() => props.setSesionModal(false)}>
            <img src={close} alt='close' />
          </Delete>
          <Tittle>WELCOME!</Tittle>
          <Form onSubmit={login}>
            <GroupInput>
              <Label>Correo</Label>
              <Input type='email' name='email' ref={emailRef}
                onChange={(event) => { setEmail(event.target.value.toLocaleLowerCase()) }} />
            </GroupInput>
            <GroupInput>
              <Label>Contraseña</Label>
              <Input type='password' name='password' ref={passwordRef}
                onChange={(event) => { setPassword(event.target.value) }} />
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


