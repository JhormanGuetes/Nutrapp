import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray } from "react-hook-form";
import styled from 'styled-components';
import { BoxForm, 
        ContainerForm,
        ContentForm,
        TittleForm, 
        BoxInput,  
        InputForm, 
        TextareaForm,
        SelectForm,
        SubmitForm, 
        InputDisable,
        Message
    } from './../FormTemplate';

    export default function FromLaboratory({ labsArray, client }) {
        const { register, control, handleSubmit, setValue, watch, formState: { errors } } = useForm();
        const [disabledForm, setDisabledForm] = useState(false);
        const [disabledButton, setDisabledButton] = useState(false);
        const [alertMsg, setAlertMsg] = useState({color:'danger', msg:''});
        let infoInputValue = [];
    
        const itemForm = (item, index) => {
            return (
                <BoxInput key={item.id}>
                    <InputDisableMd
                        defaultValue={ item.nombre }
                        {...register(`labs.${index}.name`)}
                        type='text' 
                        disabledForm={disabledForm} 
                    />
                    <InputFormXs
                        id={ 'itemLab' + index }
                        {...register(`labs.${index}.value`)}
                        type='number' 
                        disabledForm={disabledForm} 
                        onChange={ (event) => getSex(event.target.value, (labsArray.find((e) => e._id === item.idLab )) , ('itemLab' + index)) }
                    />                
                    <InputDisableXs
                        defaultValue={ item.unidad }
                        {...register(`labs.${index}.unit`)}
                        type='text' 
                        disabledForm={disabledForm} 
                    />      
                    
                </BoxInput>
            );
        }

        const colorChange = (value, item, id) => {
            if (value !== null) {
                //getSex( value, item, id );
                console.log(value);
                console.log(item);
                console.log(id);
                console.log(document.getElementById('itemLab' + 1)); 
            }
        }
    
        const { fields, append } = useFieldArray({
            control,
            name: "labs"
        });
    
        useEffect(() => {
            if (labsArray && client) {
                console.log(client.labs);
                console.log(labsArray);

                if (client.labs[0]) {
                    client.labs.map((lab, index) =>{
                        append({ 'idLab':lab.idLab, 
                                'name':lab.name,
                                'value':lab.value,
                                'unit':lab.unit });
                    })
                    setDisabledForm(true);
                }
                else {
                    labsArray.map((lab, index) =>{
                        append({ 'idLab':lab._id, 
                                'name':lab.nombre,
                                'value':'',
                                'unit':lab.unidad });                     
                    })
                } 
            }
        }, [labsArray, client]);

        useEffect(() => {
            if (fields.length === 37) {
                //console.log(fields.length);
                //
                fields.map( (item, index) => {
                    getSex(item.value, (labsArray.find((e) => e._id === item.idLab )) , ('itemLab' + index))
                } )
            }
        }, [fields]);
    
        const alert = (msg, color) =>{
            setAlertMsg({color:color, msg:msg});
            setInterval(()=>{
                setAlertMsg( {...alertMsg, msg:'' });
            },4000);
        }
    
        const getSex = (value, item, id) => {
            
            if (item.unisex === true) {
                calColour(item.minimo, item.maximo, value, id);
            }
            else {
                if ( sessionStorage.getItem('sexClient') === 'm' ) {
                    calColour(item.minimoHombre, item.maximoHombre, value, id);
                }
                else {
                    calColour(item.minimoMujer, item.maximoMujer, value, id);
                } 
            }
        }
    
        const calColour = (min, max, value, id) => {
            const elem = document.getElementById(id);
    
            if ( parseFloat(value) < min ) elem.setAttribute('style', 'outline: 2px solid yellow')
            else if ( parseFloat(value) > max ) elem.setAttribute('style', 'outline: 2px solid red')
            else if ( parseFloat(value) >= min && parseFloat(value) <= max ) elem.setAttribute('style', 'outline: 2px solid green')
            else if ( value === '' ) elem.setAttribute('style', 'outline: none')
    
        }
    
        const onSubmit = async (data) => {
            console.log(data);
            setDisabledButton(true);
            data._id = sessionStorage.getItem('idClient');
            const res = await fetch( 'http://localhost:3001/api/v1/add-lab', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data)} );
            const dataRes = await res.json();
            
            if(dataRes.ok){
                alert( dataRes.message, 'success');
                setDisabledForm(true);
            } else{
                alert( dataRes.message, 'danger');
                setDisabledButton(false);
            }
        }
        
        return <>
            <BoxForm>
                <form onSubmit={handleSubmit(onSubmit)} >
                    <TittleForm>Laboratorios</TittleForm>
                    <ContainerForm>
                        <ContentForm>
                            { fields.map((item, index) => {
                                if (index <= 18)  return (itemForm(item, index))
                            })}
                        </ContentForm>
                        <SpaceBlank />
                        <ContentForm>
                            { fields.map((item, index) => {
                                if (index > 18)  return (itemForm(item, index))
                            })}
                        </ContentForm>
                    </ContainerForm>
    
                    <SubmitForm 
                        type='submit'
                        disabledForm={disabledForm}
                        disabledButton={disabledButton}>
                            Guardar
                    </SubmitForm>
                    <Message color={alertMsg.color} >{alertMsg.msg}</Message>
                </form>
            </BoxForm>
        </>
    }

const InputDisableMd = styled(InputDisable)`
    width: 40%;
    margin: 0;
`;

const InputDisableXs = styled(InputDisable)`
    width: 20%;
    margin-left: 1em;
`;

const InputFormXs = styled(InputForm)`
    width: 20%;
    margin-left: 3px;
`;

const SpaceBlank = styled(ContainerForm)`
    width: 20%;
`;
