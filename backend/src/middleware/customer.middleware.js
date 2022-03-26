const Customer = require("../models/customer.model.js");
const pesoIdealHamwi = async (req, res, next) => {
    try {

        const { talla, circunferenciaMunieca, idCustomer } = req.body;
        console.log("Entro");
        if (typeof talla === 'number') {
            console.log("Entro ===> 2");
            console.log(idCustomer);
            const customer = await Customer.findById({ _id: idCustomer });
            console.log(customer);
            
            if (customer.sex === "M") {
                console.log("Entro ===> 3");
                // PESO IDEAL O TEÓRICO: 1. Hamwi
                let pesoIdealHamwiHombres = (talla - 152) * 1.08 + 48.5;
                req.locals = {pesoIdealHamwiHombres};
                
                let contexturaGrant = talla / circunferenciaMunieca;
                
                if (contexturaGrant > 10.4) {
                    console.log("Entro ===> 4");
                    let contexturaPequenia = "Contextura Pequeña";
                    req.locals = {contexturaPequenia};
                } else if (contexturaGrant > 9.6 && contexturaGrant <= 10.4) {
                    console.log("Entro ===> 4");
                    let contexturaMediana = "Contextura Mediana";
                    req.locals = {contexturaMediana};
                } else if (contexturaGrant <= 9.6) {
                    console.log("Entro ===> 4");
                    let contexturaGrande = "Contextura Grande";
                    req.locals = {contexturaGrande};
                }
                console.log("Entro ===> 4");
                // PESO IDEAL O TEÓRICO: 2. Bocca
            } else {
                console.log("Entro ===> 4");
                let pesoIdealHamwiMujeres = (talla - 152) * 1.08 + 48.5;
                req.locals = {pesoIdealHamwiMujeres};
                
                let contexturaGrant = talla / circunferenciaMunieca;
                
                if (contexturaGrant > 11) {
                    console.log("Entro ===> 4");
                    let contexturaPequenia = "Contextura Pequeña";
                    req.locals = {contexturaPequenia};
                } else if (contexturaGrant > 10.4 && contexturaGrant <= 11) {
                    console.log("Entro ===> 4");
                    let contexturaMediana = "Contextura Mediana";
                    req.locals = {contexturaMediana};
                } else if (contexturaGrant <= 10.11) {
                    console.log("Entro ===> 4");
                    let contexturaGrande = "Contextura Grande";
                    req.locals = {contexturaGrande};
                }
            }
            next();
        } else {
            next(new Error('La talla tiene que se un número.'))
        }
    }catch(error){
        next(new Error('No se pude agregar'));
    }
}
module.exports = {
    pesoIdealHamwi,
}