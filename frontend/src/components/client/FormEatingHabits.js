import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray } from "react-hook-form";
import styled from 'styled-components';
import FormAlert from '../FormAlert';
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
        AddButton,
        Message
    } from './../FormTemplate';

export default function FormEatingHabits({ dataJson }) {
    const { register, control, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm();
    const [disabledForm, setDisabledForm] = useState(false);
    const [disabledButton, setDisabledButton] = useState(false);
    const [alertMsg, setAlertMsg] = useState({color:'danger', msg:''});
    const [formAlertShow, setFormAlertShow] = useState(false);
    const [saveForm, setSaveForm] = useState(false);

    const itemForm = (item, index) => {
        return <>
            <BoxInput key={item.id}>
                <InputFormLarge
                    {...register(`feedingHabits.${index}.name`)}
                    type='text' 
                    disabledForm={disabledForm} 
                />
                <SelectFormXs
                    {...register(`feedingHabits.${index}.times`)} 
                    disabledForm={disabledForm} >
                        <option value='0'>0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                </SelectFormXs>
                <SelectFormMd
                    {...register(`feedingHabits.${index}.typeTimes`)} 
                    disabledForm={disabledForm} >
                        <option value="dia">Diario(s)</option>
                        <option value="sem">Semanal(es)</option>
                        <option value="quinc">Quincenal(es)</option>
                        <option value="mes">Mesual(es)</option>
                </SelectFormMd>
                <InputFormXLarge
                    {...register(`feedingHabits.${index}.descriptionHabit`)} 
                    type='text'  
                    disabledForm={disabledForm}
                />
            </BoxInput>
            </>
    }

    let nextIndex = 0;
    const food = [ 'Cereales de desayuno', 'Arroz', 'Harina de maíz', 'Pasta', 
                        'Pan', 'jugos naturales', 'Pescados frescos', 'Pescados enlatados', 
                        'Huevos', 'Leche completa', 'Leche almendras', 'margarina o mantequilla', 
                        'Raíces (cocidas)', 'Plátano', 'Vegetales crudos', 'Vegetales cocidos', 
                        'Frutas enteras', 'embutidos', 'Mayonesa', 'Refrescos', 
                        'Jugos pasteurizados', 'Agua', 'chocolates', 'tortas/ galletas' ];

    const { fields, remove, append } = useFieldArray({
        control,
        name: "feedingHabits"
    });

    useEffect(() => {
        if (dataJson) {
            console.log(dataJson);
            if (dataJson.feedingHabits[0]) {
                setDisabledForm(true);

                const habits = dataJson.feedingHabits;
                habits.map((habit, index) =>{
                    append({ 'idHabit':habit.idHabit, 
                            'name':habit.name,
                            'times':habit.times, 
                            'typeTimes':habit.typeTimes, 
                            'descriptionHabit':habit.descriptionHabit});
                    nextIndex = index + 1;
                })
            }
            else {
                food.map((habit, index) => {
                    append({ 'idHabit':index, 'name':habit, 'times':'', 'typeTimes':'sem', 'descriptionHabit':''});
                    nextIndex = index + 1;
                })
            }
        }
    }, [dataJson]);

    const addHabit = () => {
        append({ 'idHabit':nextIndex, 'name':'', 'times':'', 'typeTimes':'', 'descriptionHabit':''});
        nextIndex += 1;
        
    }

    const validationInputs = (data) => {
        console.log(data);
        data.feedingHabits.map((input) => {
            if (input.times === '') {
                return false;
            }
        });
        return true;
    }

    const alert = (msg, color) =>{
        setAlertMsg({color:color, msg:msg});
        setInterval(()=>{
            setAlertMsg( {...alertMsg, msg:'' });
        },4000);
    }

    const onSubmit = async (data) => {
        if ( validationInputs(data) === true ) {
            setDisabledButton(true);
            data._id = sessionStorage.getItem('idClient');
            const res = await fetch( 'http://localhost:3001/api/v1/add-feeding-habits', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data)} );
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
            <form onSubmit={handleSubmit(onSubmit)} >
                <TittleForm>Hábitos Alimentarios</TittleForm>
                <ContainerForm>
                    
                    <ContentForm>
                        { fields.map((item, index) => {
                            if (index % 2 === 0) {
                                return (itemForm(item, index))
                            }
                        })}
                    </ContentForm>
                    <ContentForm>
                        { fields.map((item, index) => {
                            if (index % 2 !== 0) {
                                return (itemForm(item, index))
                            }
                        })}
                    </ContentForm>
                </ContainerForm>

                <AddButton 
                    type='button' 
                    disabledForm={disabledForm}
                    onClick={addHabit}>+</AddButton>

                <SubmitForm 
                    type='submit'
                    disabledForm={disabledForm}
                    disabledButton={disabledButton}>
                        Guardar
                </SubmitForm>
                <Message color={alertMsg.color} >{alertMsg.msg}</Message>
            </form>
        </BoxForm>
        { formAlertShow && <FormAlert setAlertShow={setFormAlertShow} setSaveForm={setSaveForm} /> } 
    </>;
}

const InputFormLarge = styled(InputForm)`
    width: 42%;
    margin: 0;
`;

const InputFormXLarge = styled(InputForm)`
    width: 50%;
    margin: 0px;
`;

const SelectFormXs = styled(SelectForm)`
    width: 14%;
`;

const SelectFormMd = styled(SelectForm)`
    width: 28%;
    margin-right: 3px;
`;