import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import styled from 'styled-components';
import { BoxForm, 
        TittleForm, 
        BoxInput, 
        LabelForm, 
        InputForm,
        TextareaForm, 
        SubmitForm 
    } from './../FormTemplate';

export default function FormInfoGeneral({dataJson}) {
    const { register, setValue } = useForm();
    const [disabledForm, setDisabledForm] = useState(false);

    useEffect(() => {
        if (dataJson) {
            setValue('name', dataJson.name);
            setValue('lastName', dataJson.lastName);
            setValue('age', dataJson.age);
            setValue('evaluationDate', formatDate());
            setValue('hoursWorking', dataJson.hoursWorking);
            setValue('sourcesOfStress', dataJson.sourcesOfStress);

            setDisabledForm(true);
        }
    }, [dataJson]);

    const formatDate = () => {
        const newDate = new Date(dataJson.evaluationDate);
        let day = `${(newDate.getDate())}`.padStart(2,'0');
        let month = `${(newDate.getMonth()+1)}`.padStart(2,'0');
        let year = newDate.getFullYear();
        return(`${year}-${month}-${day}`);
    }

    return <>
        <BoxForm>
            <form>
                <TittleForm>Información General</TittleForm>
                <BoxInput>
                    <LabelForm>Nombre</LabelForm>
                    <Input 
                        {...register('name')} 
                        type='text' 
                        autoComplete="off" 
                        disabledForm={disabledForm} 
                    />
                </BoxInput>
                <BoxInput>
                    <LabelForm>Apellidos</LabelForm>
                    <Input 
                        {...register('lastName')} 
                        type='text' 
                        autoComplete="off" 
                        disabledForm={disabledForm} 
                    />
                </BoxInput>
                <BoxInput>
                    <LabelForm>Edad</LabelForm>
                    <InputMin 
                        {...register('age')} 
                        type='number' 
                        min='0' 
                        disabledForm={disabledForm} 
                    />
                    <Unit>Año(s)</Unit>
                </BoxInput>
                <BoxInput>
                    <LabelForm>Día de la Consulta</LabelForm>
                    <Input 
                        {...register('evaluationDate')} 
                        type='date' 
                        disabledForm={disabledForm} 
                    />
                </BoxInput>
                <BoxInput>
                    <LabelForm>Horas de Trabajo</LabelForm>
                    <InputMin 
                        {...register('hoursWorking')} 
                        type='number' 
                        min='0' 
                        disabledForm={disabledForm} 
                    />
                    <Unit>Hora(s)</Unit>
                </BoxInput>
                <BoxInput>
                    <LabelForm>Fuentes de Estrés</LabelForm>
                    <TextareaForm 
                        {...register('sourcesOfStress')} 
                        type='text' 
                        autoComplete="off" 
                        disabledForm={disabledForm} 
                    />
                </BoxInput>
            </form> 
        </BoxForm> 
        
        
    </>;
}

const Input = styled(InputForm)`
    width: 60%;
`;

const InputMin = styled(InputForm)`
    width: 45%;
`;

const Unit = styled(LabelForm)`
    width: 15%;
    text-align: center;
`;