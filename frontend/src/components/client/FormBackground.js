import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { BoxForm, 
        TittleForm, 
        BoxInput, 
        LabelForm, 
        TextareaForm,
        SubmitForm,
        Message,
    } from './../FormTemplate';

export default function FormBackground({dataJson}) {
    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm();
    const [disabledForm, setDisabledForm] = useState(false);
    const [disabledButton, setDisabledButton] = useState(false);
    const [alertMsg, setAlertMsg] = useState({color:'danger', msg:''});

    useEffect(() => {
        if (dataJson) {
            if (dataJson.personalHistory || dataJson.familyBackground) {
                setValue('personalHistory', dataJson.personalHistory);
                setValue('familyBackground', dataJson.familyBackground);

                setDisabledForm(true);
            }
        }
    }, [dataJson]);

    const alert = (msg, color) =>{
        setAlertMsg({color:color, msg:msg});
        setInterval(()=>{
            setAlertMsg( {...alertMsg, msg:'' });
        },4000);
    }

    const onSubmit = async (data) => {
        setDisabledButton(true);
        data._id = sessionStorage.getItem('idClient');
        const res = await fetch( 'http://localhost:3001/api/v1/background', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data)} );
        const dataRes = await res.json();
        
        if(dataRes.ok){
            alert( dataRes.message, 'success');
            setDisabledForm(true);
        } else{
            alert( dataRes.message, 'danger');
            setDisabledButton(false);
        }
    };

    return <>
        <BoxForm>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TittleForm>Antecedentes</TittleForm>
                <BoxInput>
                    <LabelForm>Personales</LabelForm>
                    <TextareaForm 
                        {...register('personalHistory')} 
                        type='text' 
                        autoComplete="off" 
                        disabledForm={disabledForm} 
                    />
                </BoxInput>
                <BoxInput>
                    <LabelForm>Familiares</LabelForm>
                    <TextareaForm 
                        {...register('familyBackground')} 
                        type='text' 
                        autoComplete="off" 
                        disabledForm={disabledForm} 
                    />
                </BoxInput>
                <SubmitForm 
                    type='submit' 
                    disabledForm={disabledForm} 
                    disabledButton={disabledButton} >
                        Guardar
                </SubmitForm>
                <Message color={alertMsg.color} >{alertMsg.msg}</Message>
            </form>
        </BoxForm>
    </>;
}

