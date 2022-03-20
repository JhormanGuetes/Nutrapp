export default function validarCamposFormulario(...campos) {
    let res = { ok: true };

    campos.forEach(campo => {
        if (campo === undefined) res = {ok:false, mensaje:'Hay campos vacíos'};
    });
    
    return res;
  }