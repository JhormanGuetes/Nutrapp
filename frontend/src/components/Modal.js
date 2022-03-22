import styled from 'styled-components';



export const Modal = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  background: rgba(0, 0, 0, .2);
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${ ({fSize}) => fSize ? fSize : 16 }px;
`;

export const Container = styled.div`
  background-color: white;
  position: relative;
`;

export const Delete = styled.button`
    position: absolute;
    top: 0;
    right: 0;
    border: none;
    cursor: pointer;
    border-radius: 0% 0% 0% 50%;
    box-shadow: -3px 3px 4px rgba(0, 0, 0, 0.15);

    &:hover{
        background-color: #0f7f7f;
        filter: invert();
    }
`;

export const Tittle = styled.p`
  margin-top: 1em;
  font-weight: bold;
  font-family: 'Baloo 2';
  color: #D1A991;
  text-align: center;

  @media screen and ( min-width: 1024px) {
    font-size: 2.2em;
  }
  @media screen and (min-width: 1400px) {
    font-size: 2.5em;
  }
`;

export const Form = styled.form`
  padding-bottom: 1.1em;
`;

export const GroupInput = styled.div`
  @media screen and ( min-width: 1024px) {
    padding: 0em 2em 1em 2em;
  }
  @media screen and (min-width: 1400px) {
    padding: 0rem 2.5em 1em 2.5em;
  }
  
`;

export const Label = styled.label`
  display: block;
  font-family: 'Baloo 2';

  @media screen and ( min-width: 1024px) {
    font-size: 1.2em;
  }
  @media screen and (min-width: 1400px) {
    font-size: 1.4em;
  }
  
`;

export const Input = styled.input`
  border: 2px solid #C9ADA7;
  box-sizing: border-box;
  box-shadow: 4px 6px 4px rgba(0, 0, 0, 0.25);
  border-radius: .16cm;
  padding-left: .5em;

  @media screen and ( min-width: 1024px) {
    height: 2.2em;
    width: 14em;
    font-size: 1.1em;
  }
  @media screen and (min-width: 1400px) {
    height: 2.6em;
    width: 16em;
    font-size: 1.3em;
  }
`;

export const Select = styled.select`
  border: 2px solid #C9ADA7;
  box-sizing: border-box;
  box-shadow: 4px 6px 4px rgba(0, 0, 0, 0.25);
  border-radius: .16cm;
  padding-left: .5em;

  @media screen and ( min-width: 1024px) {
    height: 2.2em;
    width: 14em;
    font-size: 1.1em;
  }
  @media screen and (min-width: 1400px) {
    height: 2.6em;
    width: 16em;
    font-size: 1.3em;
  }
`;

export const ContainerSubmit = styled.div`
  display: flex;
  justify-content: center;
`;

export const ErrorMessage = styled.p`
  width: 100%;
  font-size: 1.2em;
  color: red;
  text-align: center;
`;