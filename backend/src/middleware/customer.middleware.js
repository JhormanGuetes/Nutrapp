const Customer = require('../models/customer.model.js');

const pesoIdealHamwi = async (_id, tallaCM, circunferenciaDeMuniecaCM) => {
	let error, pesoIdealHamwi, contexturaGrantValor, contexturaGrantTipo;
	try {
		if (typeof tallaCM === 'number') {
			//console.log(idCustomer);
			const customer = await Customer.findById({ _id });
			//console.log(customer);

			if (customer.sex === 'M') {
				pesoIdealHamwi = (tallaCM - 152) * 1.08 + 48.5;

				contexturaGrantValor = tallaCM / circunferenciaDeMuniecaCM;

				if (contexturaGrantValor > 10.4) {
					contexturaGrantTipo = 'Contextura Pequeña';
				} else if (contexturaGrantValor > 9.6 && contexturaGrantValor <= 10.4) {
					contexturaGrantTipo = 'Contextura Mediana';
					req.locals = { contexturaMediana };
				} else if (contexturaGrantValor <= 9.6) {
					contexturaGrantTipo = 'Contextura Grande';
				}
				// PESO IDEAL O TEÓRICO: 2. Bocca
			} else {
				pesoIdealHamwi = (tallaCM - 152) * 0.88 + 48.5;

				contexturaGrantValor = tallaCM / circunferenciaMunieca;

				if (contexturaGrantValor > 11) {
					contexturaGrantTipo = 'Contextura Pequeña';
				} else if (contexturaGrantValor > 10.4 && contexturaGrantValor <= 11) {
					contexturaGrantTipo = 'Contextura Mediana';
				} else if (contexturaGrantValor <= 10.11) {
					contexturaGrantTipo = 'Contextura Grande';
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
					if (err) error = err;
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
const pesoIdealBrocca = async (_id, tallaCM, circunferenciaMunieca) => {
	let error = null,
		contexturaGrantTipo,
		contexturaGrantValor,
		pesoIdealBrocca;
	const customer = await Customer.findById({ _id });
	//console.log(customer, 'sal');

	pesoIdealBrocca = tallaCM - 100;
	contexturaGrantValor = tallaCM / circunferenciaMunieca;

	if (customer.sex === 'M') {
		if (contexturaGrantValor > 5.4) {
			contexturaGrantTipo = 'Contextura Pequeña';
		} else if (contexturaGrantValor > 9.6 && contexturaGrantValor <= 10.4) {
			contexturaGrantTipo = 'Contextura Mediana';
		} else if (contexturaGrantValor <= 9.6) {
			contexturaGrantTipo = 'Contextura Grande';
		}
	} else {
		if (contexturaGrantValor > 6) {
			contexturaGrantTipo = 'Contextura Pequeña';
		} else if (contexturaGrantValor > 10.4 && contexturaGrantValor <= 11) {
			contexturaGrantTipo = 'Contextura Mediana';
		} else if (contexturaGrantValor <= 10.11) {
			contexturaGrantTipo = 'Contextura Grande';
		}
	}
	//Actualizando los datos del cliente
	Customer.updateOne(
		{ _id },
		{
			$set: {
				pesoIdealBrocca: pesoIdealBrocca,
				contexturaGrantValor: contexturaGrantValor,
				contexturaGrantTipo: contexturaGrantTipo,
			},
		},
		(err) => {
			if (err) error = err;
		}
	);
	if (!error) return true;
	else return false;
};
const pesoIdealClinicaMayoWest = async (_id, tallaCM) => {
	let error, pesoIdealClinicaMayoWestMT;
	try {
		console.log('Clinica');
		const customer = await Customer.findById({ _id });
		//console.log(customer, 'customer');
		//console.log(typeof tallaCM, 'tipos');
		if (typeof tallaCM === 'number' && tallaCM >= 0) {
			if (customer.sex === 'M') {
				pesoIdealClinicaMayoWestMT = 22.1 * (tallaCM / 100) * 2;
			} else {
				pesoIdealClinicaMayoWestMT = 20.6 * (tallaCM / 100) * 2;
			}
			console.log('asignado');
			console.log(pesoIdealClinicaMayoWestMT, 'clinica metros');
			Customer.updateOne(
				{ _id },
				{
					$set: {
						pesoIdealClinicaMayoWestMetros: pesoIdealClinicaMayoWestMT,
					},
				},
				(err) => {
					if (err) error = err;
				}
			);
			return true;
		} else {
			return false;
		}
	} catch (err) {
		return false;
	}
};
const pesoIdealIMC = async (_id, tallaCM, tipoDePeso) => {
	let pesoIdealIMCMetros;
	const customer = await Customer.findById({ _id });

	if (tipoDePeso === 'Bajo Peso') {
		pesoIdealIMCMetros = 18.5 * (tallaCM / 100) * 2;
	} else if (tipoDePeso === 'Sobrepeso u Obesidad') {
		pesoIdealIMCMetros = 24.9 * (tallaCM / 100) * 2;
	} else if (tipoDePeso === 'Peso Promedio') {
		pesoIdealIMCMetros = 21.7 * (tallaCM / 100) * 2;
	} else {
		return false;
	}
	Customer.updateOne(
		{ _id },
		{
			$set: { pesoIdealIMCMetros: pesoIdealIMCMetros },
		},
		(err) => {
			if (err) return false;
		}
	);
	return true;
};
const pesoIdealAjustado = async (_id, pesoActualKG) => {
	let pesoActualKilogramos;
	const customer = await Customer.findById({ _id });

	if (typeof pesoActualKG === 'number' && customer.pesoIdealIMCMetros !== -1) {
		pesoActualKilogramos =
			(pesoActualKG - customer.pesoIdealIMCMetros) * 0.25 +
			customer.pesoIdealIMCMetros;
	} else {
		return false;
	}
	Customer.updateOne(
		{ _id },
		{
			$set: {
				pesoIdealAjustado: pesoActualKilogramos,
			},
		},
		(err) => {
			if (err) return false;
		}
	);
	return true;
};
module.exports = {
	pesoIdealHamwi,
	pesoIdealBrocca,
	pesoIdealIMC,
	pesoIdealClinicaMayoWest,
	pesoIdealAjustado,
};
