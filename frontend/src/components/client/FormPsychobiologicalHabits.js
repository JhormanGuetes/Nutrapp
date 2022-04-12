import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray } from "react-hook-form";
import styled from 'styled-components';
import { BoxForm, 
        TittleForm, 
        BoxInput,  
        InputForm, 
        TextareaForm,
        SelectForm,
        SubmitForm, 
        InputDisable,
        Message
    } from './../FormTemplate';

export default function FormPsychobiologicalHabits({ dataJson }) {
    const { register, control, handleSubmit, setValue, watch, formState: { errors } } = useForm();
    const [disabledForm, setDisabledForm] = useState(false);
    const [disabledButton, setDisabledButton] = useState(false);
    const [alertMsg, setAlertMsg] = useState({color:'danger', msg:''});
    const [habitsArray, setHabitsArray] = useState();

    const nameHabits = [
        'Café','Tabaco','Alcohol','Sueño', 'Evacuaciones', 'Actividad Física', 'Micciones'
    ];

    const { fields, append } = useFieldArray({
        control,
        name: "psychologicalHabit"
    });

    useEffect(() => {
        if (habitsArray) {
            habitsArray.map((habit, index) => {
                append({ 'idHabit':habit._id, 'times':'', 'typeTimes':'dia', 'descriptionHabit':''});
            });
        }
    }, [habitsArray]);

    
    useEffect(() => {
        const fetchHabits = async () => {
            const res = await fetch(`http://localhost:3001/api/v1/list-psycho`, 
                        { method: 'GET'} );
            const dataHabits = await res.json();
            setHabitsArray(dataHabits.psycho);
        }
        fetchHabits();
    }, []);

    useEffect(() => {
        if (dataJson && habitsArray) {
            if (dataJson.psychologicalHabit[0]) {
                setValue('allergies', dataJson.allergies);
                setValue('supplements', dataJson.supplement);
                setValue('intolerances', dataJson.intolerances);

                const habits = dataJson.psychologicalHabit;

                habits.map((habit, index) =>{
                    setValue(`psychologicalHabit.${index}.idHabit`, habit.idHabit);
                    setValue(`psychologicalHabit.${index}.times`, habit.times);
                    setValue(`psychologicalHabit.${index}.typeTimes`, habit.typeTimes);
                    setValue(`psychologicalHabit.${index}.descriptionHabit`, habit.descriptionHabit);
                    
                })
                setDisabledForm(true);
            }
        }
    }, [dataJson, habitsArray]);

    const alert = (msg, color) =>{
        setAlertMsg({color:color, msg:msg});
        setInterval(()=>{
            setAlertMsg( {...alertMsg, msg:'' });
        },4000);
    }

    const validationInputs = (data) => {
        data.map((input) => {
            if (input.times === '') {
                return false;
            }
        });
        return true;
    }

    const onSubmit = async (data) => {
        if ( validationInputs(data) ) {
            setDisabledButton(true);
            data._id = sessionStorage.getItem('idClient');
            const res = await fetch( 'http://localhost:3001/api/v1/add-psychological-habit', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data)} );
            const dataRes = await res.json();
            
            if(dataRes.ok){
                alert( dataRes.message, 'success');
                setDisabledForm(true);
            } else{
                alert( dataRes.message, 'danger');
                setDisabledButton(false);
            }
        }
        else {
            alert( 'Los campos numéricos son obligatorios', 'danger');
        }
    };

    return <>
        <BoxForm>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TittleForm>Hábitos Psicobiológicos</TittleForm>

                { fields.map((item, index) => ( 
                    <BoxInput key={item.idHabit}>
                        <InputDisable defaultValue={nameHabits[index]} />
                        <InputFormXs 
                            {...register(`psychologicalHabit.${index}.times`)} 
                            type='number' 
                            min='0'
                            disabledForm={disabledForm}
                        />
                        <SelectFormXs 
                            {...register(`psychologicalHabit.${index}.typeTimes`)} 
                            disabledForm={disabledForm}
                        >
                            <option value="dia">Diario(s)</option>
                            <option value="sem">Semanal(es)</option>
                            <option value="quinc">Quincenal(es)</option>
                            <option value="mes">Mesual(es)</option>
                        </SelectFormXs>
                        <InputFormLarge 
                            {...register(`psychologicalHabit.${index}.descriptionHabit`)} 
                            type='text' 
                            disabledForm={disabledForm}
                        />
                    </BoxInput>
                 )) }

                <BoxInput>
                    <InputDisable defaultValue='Alergias' />
                    <TextareaForm 
                        {...register('allergies')} 
                        type='text'
                        disabledForm={disabledForm}
                    />
                </BoxInput>
                <BoxInput>
                    <InputDisable defaultValue='Suplementos' />
                    <TextareaForm 
                        {...register('supplements')} 
                        type='text'
                        disabledForm={disabledForm}
                    />
                </BoxInput>
                <BoxInput>
                    <InputDisable defaultValue='Intolerancias' />
                    <TextareaForm 
                        {...register('intolerances')} 
                        type='text' 
                        disabledForm={disabledForm}
                    />
                </BoxInput>
                <SubmitForm 
                    type='submit'
                    disabledForm={disabledForm}
                    disabledButton={disabledButton}>
                        Guardar
                </SubmitForm>
                <Message color={alertMsg.color} >{alertMsg.msg}</Message>
            </form>
        </BoxForm>
        
    </>;
}

const InputFormXs = styled(InputForm)`
    width: 6%;
`;

const InputFormLarge = styled(InputForm)`
    width: 30%;
    margin-left: 3px;
`;

const SelectFormXs = styled(SelectForm)`
    width: 23%;
`;