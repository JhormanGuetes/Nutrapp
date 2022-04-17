import styled from 'styled-components';

export const BoxForm = styled.div`
    position: relative;
    background-color: #F1F1F1;
    padding: 1.5em;
    margin: 2em 0em 1em 1.4em ;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 6px;
`;

export const ContainerForm = styled.div`
  display: flex;
`;

export const ContentForm = styled.div`
  width: 50%;
  height: 100%;
  padding-left: 20px;
`;

export const TittleForm = styled.p`
    margin-bottom: 1.3em;
    font-family: 'Asul', sans-serif;
    font-weight: bold;
    font-size: medium;
    color: #545454;

    
`;

export const BoxInput = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    margin-top: .6em;

    
`;

export const LabelForm = styled.label`
    font-family: 'Asul', sans-serif;
    color: #545454;
    font-size: .84em;
    width: 36%;

    
`;

export const SelectForm = styled.select`
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    border: none;
    margin-left: 3px;
    height: 1.7em;
    padding: 0em .6em;
    background-color: ${({disabledForm}) => disabledForm ? '#E1E1E1' : '#FFF' };
    pointer-events: ${({disabledForm}) => disabledForm && 'none' };
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
    border-radius: 4px;
`;

export const InputForm = styled.input`
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    border: none;
    height: 1.7em;
    width: 64%;
    padding: 0em .6em;
    background-color: ${({disabledForm}) => disabledForm ? '#E1E1E1' : '#FFF' };
    pointer-events: ${({disabledForm}) => disabledForm && 'none' };
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
    border-radius: 4px;
    
    

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    &:focus {
        outline: 1px solid #D1A991;
    }
`;

export const TextareaForm = styled.textarea`
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    height: auto;
    width: 64%;
    border: none;
    resize: none;
    padding-left: .6em;
    background-color: ${({disabledForm}) => disabledForm ? '#E1E1E1' : '#FFF' };
    pointer-events: ${({disabledForm}) => disabledForm && 'none' };
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
    border-radius: 4px;

    

    &:focus {
        outline: 1px solid #D1A991;
    }
`;

export const InputDisable = styled.input`
    border: none;
    width: 32%;
    pointer-events: none;
    background-color: transparent;
    font-family: 'Asul', sans-serif;
    color: #545454;
    font-size: .84em;

    
`;

export const SubmitForm = styled.button`
    position: relative;
    border: none;
    width: 90px;
    background-color: #F08080;
    margin-top: 1.4em;
    padding: 0.3em 1em;
    color: white;
    font-weight: 600;
    border-radius: 3px;
    left: calc(100% - 94px);
    pointer-events: ${({disabledButton}) => disabledButton && 'none' };
    display: ${({disabledForm}) => disabledForm === true && 'none' };

    

    &:hover {
        background-color: #F1F1F1;
        color: black;
        outline: 1px solid #F08080;
        color: #F08080;
    }

    &:active {
        transform: scale(96%);
    }
`;

export const AddButton = styled.button`
    height: 24px;
    width: 24px;
    border-radius: 2rem;
    background-color: #F08080;
    border: none;
    position: absolute;
    bottom: 20px;
    left: 40px;
    font-size: 1.3rem;
    font-weight: 600;
    color: white;
    display: ${({disabledForm}) => disabledForm === true && 'none' };

    &:hover {
        background-color: #F1F1F1;
        color: black;
        outline: 1px solid #F08080;
        color: #F08080;
    }

    &:active {
        transform: scale(90%);
    }
`;

export const Message = styled.p`
    color: ${({color}) => color === 'danger' ? 'red' : 'green' };
`;