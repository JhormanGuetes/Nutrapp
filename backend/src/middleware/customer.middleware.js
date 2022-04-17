const Customer = require("../models/customer.model.js");
const elegirPesoIdeal = async (req, res, next) => {
  let error;
  try {
    const {
      _id,
      tallaCM,
      circunferenciaDeMuniecaCM,
      pesoActualKG,
      pesoACalcular,
    } = req.body;

    Customer.updateOne(
      { _id },
      {
        $set: {
          tallaCentrimetros: tallaCM,
          circunferenciaDeMuniecaCentrimetros: circunferenciaDeMuniecaCM,
        },
      },
      (err) => {
        if (error) error = err;
      }
    );
    if (pesoACalcular === "Hamwi/Brocca") {
      //console.log(typeof tallaCM)
      if (tallaCM >= 152) {
        pesoIdealHamwi(_id, tallaCM, circunferenciaDeMuniecaCM);
      } else if (tallaCM < 152 && tallaCM >= 0) {
        console.log("Entro");
        exito = await pesoIdealBocca(_id, tallaCM, circunferenciaDeMuniecaCM);
        console.log(exito, "pto");
        res
          .status(200)
          .json({ ok: true, message: "Brocca se agregó con éxito" });
      } else {
        res
          .status(400)
          .json({ ok: false, message: "Verifique las variables." });
      }
    } else if (pesoACalcular === "Clínica Mayo; West") {
    } else if (pesoACalcular === "IMC") {
    } else if (pesoACalcular === "Peso Ajustado") {
    }
    next();
  } catch (error) {
    res
      .status(400)
      .json({ ok: false, message: "No se puede agregar las variables" });
  }
};
const pesoIdealHamwi = async (_id, tallaCM, circunferenciaDeMuniecaCM) => {
  let error, pesoIdealHamwi, contexturaGrantValor;
  try {
    if (typeof tallaCM === "number") {
      //console.log(idCustomer);
      const customer = await Customer.findById({ _id });
      console.log(customer);

      if (customer.sex === "M") {
        pesoIdealHamwi = (tallaCM - 152) * 1.08 + 48.5;

        contexturaGrantValor = tallaCM / circunferenciaDeMuniecaCM;

        if (contexturaGrantValor > 10.4) {
          contexturaGrantTipo = "Contextura Pequeña";
        } else if (contexturaGrantValor > 9.6 && contexturaGrantValor <= 10.4) {
          contexturaGrantTipo = "Contextura Mediana";
          req.locals = { contexturaMediana };
        } else if (contexturaGrantValor <= 9.6) {
          contexturaGrantTipo = "Contextura Grande";
        }
        // PESO IDEAL O TEÓRICO: 2. Bocca
      } else {
        pesoIdealHamwi = (tallaCM - 152) * 0.88 + 48.5;

        contexturaGrantValor = tallaCM / circunferenciaMunieca;

        if (contexturaGrantValor > 11) {
          let contexturaGrantTipo = "Contextura Pequeña";
        } else if (contexturaGrantValor > 10.4 && contexturaGrantValor <= 11) {
          contexturaGrantTipo = "Contextura Mediana";
        } else if (contexturaGrantValor <= 10.11) {
          contexturaGrantTipo = "Contextura Grande";
        }
      }

      //Actualizando los datos del cliente
      Customer.updateOne(
        { _id },
        {
          $set: {
            pesoIdealHamwi: pesoIdealHamwi,
            contexturaGrantValor: contexturaGrantValor,
            contexturaGrantTipo: contexturaGrantTipo,
          },
        },
        (err) => {
          if (error) error = err;
        }
      );
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};
const pesoIdealBocca = async (_id, tallaCM, circunferenciaMunieca) => {
  let error, contexturaGrantTipo;
  try {
    const customer = await Customer.findById({ _id });
    console.log(customer, "sal");

    const pesoIdeal = tallaCM - 100;
    if (customer.sex === "M") {
      console.log("Sex masculino");
      // PESO IDEAL O TEÓRICO: 1. Hamwi
      let pesoIdealBroccaHombres = (tallaCM - 152) * 1.08 + 48.5;

      console.log(customer);
      let contexturaGrantValor = tallaCM / circunferenciaMunieca;

      if (contexturaGrantValor > 5.4) {
        contexturaGrantTipo = "Contextura Pequeña";
      } else if (contexturaGrantValor > 9.6 && contexturaGrantValor <= 10.4) {
        contexturaGrantTipo = "Contextura Mediana";
      } else if (contexturaGrantValor <= 9.6) {
        contexturaGrantTipo = "Contextura Grande";
      }
      //Actualizando los datos del cliente
      Customer.updateOne(
        { _id },
        {
          $set: {
            pesoIdealBrocca: pesoIdealBroccaHombres,
            contexturaGrantValor: contexturaGrantValor,
            contexturaGrantTipo: contexturaGrantTipo,
          },
        },
        (err) => {
          if (error) error = err;
        }
      );
      return true;
    } else {
      let pesoIdealBroccaMujeres = (tallaCM - 152) * 1.08 + 48.5;
      req.locals = { pesoIdealBroccaMujeres };

      let contexturaGrant = tallaCM / circunferenciaMunieca;

      if (contexturaGrant > 6) {
        let contexturaPequenia = "Contextura Pequeña";
        req.locals = { contexturaPequenia };
      } else if (contexturaGrant > 10.4 && contexturaGrant <= 11) {
        let contexturaMediana = "Contextura Mediana";
        req.locals = { contexturaMediana };
      } else if (contexturaGrant <= 10.11) {
        let contexturaGrande = "Contextura Grande";
        req.locals = { contexturaGrande };
      }
      return true;
    }
  } catch (error) {
    return false;
  }
};
const pesoIdealClinicaMayoWest = async (req, res, next) => {
  try {
    const { tallaCM, circunferenciaMunieca, idCustomer } = req.body;
    const customer = await Customer.findById({ _id: idCustomer });

    if (customer.sex == "M") {
      const pesoIdealClinicaMayoWestMT = 22.1 * (tallaCM / 100) * 2;
    } else {
      const pesoIdealClinicaMayoWestMT = 20.6 * (tallaCM / 100) * 2;
    }
    next();
  } catch (error) {}
};
const pesoIdealIMC = async (req, res, next) => {
  try {
    const { tallaCM, circunferenciaMunieca, idCustomer } = req.body;
    const customer = await Customer.findById({ _id: idCustomer });

    if (customer.sex == "M") {
      const pesoIdealClinicaMayoWestMT = 22.1 * (tallaCM / 100) * 2;
    } else {
      const pesoIdealClinicaMayoWestMT = 20.6 * (tallaCM / 100) * 2;
    }
    next();
  } catch (error) {}
};
module.exports = {
  elegirPesoIdeal,
};
