import validarEmail from './validarEmail';

export default function validarFormulario(tipo, email, contraseña, nombre) {
    let res = { ok: true };

    if(!(email || contraseña)) return {ok:false, mensaje:'Hay campos vacíos'} ;
    if(!validarEmail(email)) return {ok:false, mensaje:'El correo no es valido'} ;

    if (tipo === 'registro') {
        if(!(nombre)) return {ok:false, mensaje:'Hay campos vacíos'} ;
    }
    
    return res;
  }