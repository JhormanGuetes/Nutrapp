import React, { useState } from 'react';
import { Modal, Container, Delete, Form, Tittle, GroupInput, Label, Select, Input, ContainerSubmit, ErrorMessage } from './Modal';
import { Submit } from './Submit';
import validarCamposFormulario from './validaciones/validarCamposFormulario';
import close from '../images/close_black_24dp.svg'

export default function NewClientModal( { setNewClientModal, setIsNewClient, isNewClient } ) {
    const [errorMessage, setErrorMessage] = useState();
    const [name, setName] = useState();
    const [lastName, setLastName] = useState();
    const [birthdate, setBirthdate] = useState();
    const [sex, setSex] = useState();


    const calcAge = ( dateString ) => {
        let date = new Date(dateString);
        let month_diff = Date.now() - date.getTime();    
        let age_dt = new Date(month_diff);        
        let year = age_dt.getUTCFullYear();  
        var age = Math.abs(year - 1970);
        return age;
    }

    const addClient = async (e) => {
        e.preventDefault();
        const validacion = validarCamposFormulario(name, lastName, birthdate);
        if (validacion.ok) {
            const client = {
                nutritionistId: sessionStorage.getItem('id'),
                name: name,
                lastName: lastName,
                sex: sex,
                age: calcAge(birthdate),   
            }
            const res = await fetch( 'http://localhost:3001/api/v1/add-customer', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(client)} );
            const data = await res.json();
            if(data.ok){
                
                setIsNewClient(!isNewClient);
                setNewClientModal(false);
            } else{
                setErrorMessage(data.message);
            }
        } else{
            setErrorMessage(validacion.mensaje);
        } 
    };

  //toast('Here is your toast.');
    return (
        <>
            <Modal fSize={13}>
            <Container>
            <Delete onClick={() => setNewClientModal(false)}>
              <img src={close} alt='close' />
            </Delete>
                <Tittle>NUEVO CLIENTE</Tittle>
                <Form onSubmit={addClient}>
                    <GroupInput>
                        <Label>Nombre</Label>
                        <Input type='text' name='name'
                        onChange={(event) => setName(event.target.value.toLocaleLowerCase())} />
                    </GroupInput>

                    <GroupInput>
                        <Label>Apellidos</Label>
                        <Input type='text' name='lastName'
                        onChange={(event) => setLastName(event.target.value.toLocaleLowerCase())} />
                    </GroupInput>

                    <GroupInput>
                        <Label>Sexo</Label>
                        <Select onChange={ (event) => setSex(event.target.value.toLocaleLowerCase()) }>
                            <option value="" disabled selected>Choose your option</option>
                            <option value="m">Hombre</option>
                            <option value="f">Mujer</option>
                        </Select>
                    </GroupInput>

                    <GroupInput>
                        <Label>Fecha de nacimiento</Label>
                        <Input type='date' name='birthdate'
                        onChange={(event) => setBirthdate(event.target.value)} />
                    </GroupInput>
                    <ErrorMessage>{errorMessage}</ErrorMessage>
                    <ContainerSubmit>
                        <Submit type='submit'>AGREGAR</Submit>
                    </ContainerSubmit>
                </Form>
                </Container>
            </Modal>
        </>
  );
}
