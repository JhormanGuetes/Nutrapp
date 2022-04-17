export default function validarEmail(email) {
    const res = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return res.test(String(email).toLowerCase());

  }