const Customer = require("../models/customer.model.js");
const pesoIdealHamwi = async (req, res, next) => {
    try {
        
        const { tallaCM, circunferenciaMunieca, idCustomer } = req.body;
        if (typeof tallaCM === 'number') {
            if(tallaCM >= 152){
                console.log(idCustomer);
                const customer = await Customer.findById({ _id: idCustomer });
                console.log(customer);
                
                if (customer.sex === "M") {
                    // PESO IDEAL O TEÓRICO: 1. Hamwi
                    let pesoIdealHamwiHombres = (tallaCM - 152) * 1.08 + 48.5;
                    req.locals = {pesoIdealHamwiHombres};
                    
                    let contexturaGrant = tallaCM / circunferenciaMunieca;
                    
                    if (contexturaGrant > 10.4) {
                        let contexturaPequenia = "Contextura Pequeña";
                        req.locals = {contexturaPequenia};
                    } else if (contexturaGrant > 9.6 && contexturaGrant <= 10.4) {
                        let contexturaMediana = "Contextura Mediana";
                        req.locals = {contexturaMediana};
                    } else if (contexturaGrant <= 9.6) {
                        let contexturaGrande = "Contextura Grande";
                        req.locals = {contexturaGrande};
                    }
                    // PESO IDEAL O TEÓRICO: 2. Bocca
                } else {
                    let pesoIdealHamwiMujeres = (tallaCM - 152) * 1.08 + 48.5;
                    req.locals = {pesoIdealHamwiMujeres};
                    
                    let contexturaGrant = tallaCM / circunferenciaMunieca;
                    
                    if (contexturaGrant > 11) {
                        let contexturaPequenia = "Contextura Pequeña";
                        req.locals = {contexturaPequenia};
                    } else if (contexturaGrant > 10.4 && contexturaGrant <= 11) {
                        let contexturaMediana = "Contextura Mediana";
                        req.locals = {contexturaMediana};
                    } else if (contexturaGrant <= 10.11) {
                        let contexturaGrande = "Contextura Grande";
                        req.locals = {contexturaGrande};
                    }
                }
                next();
            }else{
                pesoIdealBocca(req, res, next);
            }
        } else {
            next(new Error('La tallaCM tiene que se un número.'))
        }
    }catch(error){
        next(new Error('No se pude agregar'));
    }
}
const pesoIdealBocca = async (req, res, next) => {
    try {
        const { tallaCM, circunferenciaMunieca, idCustomer } = req.body;
        const customer = await Customer.findById({ _id: idCustomer });
        
        const pesoIdeal = tallaCM - 100;
        if (customer.sex === "M") {
            // PESO IDEAL O TEÓRICO: 1. Hamwi
            let pesoIdealHamwiHombres = (tallaCM - 152) * 1.08 + 48.5;
            req.locals = {pesoIdealHamwiHombres};
            
            let contexturaGrant = tallaCM / circunferenciaMunieca;
            
            if (contexturaGrant > 5.4) {
                let contexturaPequenia = "Contextura Pequeña";
                req.locals = {contexturaPequenia};
            } else if (contexturaGrant > 9.6 && contexturaGrant <= 10.4) {
                let contexturaMediana = "Contextura Mediana";
                req.locals = {contexturaMediana};
            } else if (contexturaGrant <= 9.6) {
                let contexturaGrande = "Contextura Grande jsjjsjdj";
                req.locals = {contexturaGrande};
            }
            // PESO IDEAL O TEÓRICO: 2. Bocca
        } else {
            let pesoIdealHamwiMujeres = (tallaCM - 152) * 1.08 + 48.5;
            req.locals = {pesoIdealHamwiMujeres};
            
            let contexturaGrant = tallaCM / circunferenciaMunieca;
            
            if (contexturaGrant > 6) {
                let contexturaPequenia = "Contextura Pequeña";
                req.locals = {contexturaPequenia};
            } else if (contexturaGrant > 10.4 && contexturaGrant <= 11) {
                let contexturaMediana = "Contextura Mediana";
                req.locals = {contexturaMediana};
            } else if (contexturaGrant <= 10.11) {
                let contexturaGrande = "Contextura Grande";
                req.locals = {contexturaGrande};
            }
        }
        next();
    } catch (error) {
        
    }
}
const clinicaMayoWest = async (req, res, next)=>{
    try {
        const { tallaCM, circunferenciaMunieca, idCustomer } = req.body;
        const customer = await Customer.findById({ _id: idCustomer });
        
        if(customer.sex == "M"){
            const pesoIdealClinicaMayoWestMT = 22.1 * (tallaCM/100)*2;
        }else{
            const pesoIdealClinicaMayoWestMT = 20.6 * (tallaCM/100)*2;
        }
    } catch (error) {
        
    }
}
module.exports = {
    pesoIdealHamwi,
    pesoIdealBocca
}