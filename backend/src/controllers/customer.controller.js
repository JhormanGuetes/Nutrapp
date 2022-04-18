const Customer = require('../models/customer.model.js');
const Psychobiological = require('../models/psycho.model.js');
const Lab = require('../models/lab.model.js');
const formulas = require('../middleware/customer.middleware.js');
const express = require('express');
const { default: mongoose } = require('mongoose');

exports.addCustomer = async (req, res) => {
	try {
		const customer = new Customer(req.body);
		await customer.save();

		res.status(201).json({ ok: true, message: 'Cliente agregado con éxito' });
	} catch (error) {
		if (error.code === 11000)
			return res
				.status(400)
				.json({ ok: false, message: 'Verifique la información del usuario.' });

		res
			.status(400)
			.json({ ok: false, message: 'No se pudo ingresar al cliente.' });
	}
};
exports.listID = async (req, res, _id) => {
	try {
		const customer = await Customer.findById({ _id });
	} catch (error) {}
};
exports.addPsychologicalHabit = async (req, res) => {
	const { _id, psychologicalHabit, allergies, supplements, intolerances } =
		req.body;
	let error;

	psychologicalHabit.forEach(async (habit) => {
		const psycho = await Psychobiological.findById({ _id: habit.idHabit });
		if (psycho) {
			Customer.updateOne(
				{
					_id,
				},
				{
					$push: {
						psychologicalHabit: {
							idHabit: habit.idHabit,
							typeTimes: habit.typeTimes,
							times: habit.times,
							descriptionHabit: habit.descriptionHabit,
						},
					},
				},
				(err) => {
					if (err) {
						error = err;
					}
				}
			);
		}
		Customer.updateOne({ _id }, { $set: { allergies: allergies } }, (err) => {
			if (error) error = err;
		});
		Customer.updateOne(
			{ _id },
			{ $set: { supplements: supplements } },
			(err) => {
				if (error) error = err;
			}
		);
		Customer.updateOne(
			{ _id },
			{ $set: { intolerances: intolerances } },
			(err) => {
				if (error) error = err;
			}
		);
	});

	if (error) {
		return res.status(400).json({
			ok: false,
			message: 'No se pudo ingresar los hábitos alimenticios.',
		});
	} else {
		res.status(201).json({
			ok: true,
			message: 'Se agregó correctamente las hábitos alimenticios.',
		});
	}
};

exports.addFeedingHabits = async (req, res) => {
	const { _id, feedingHabits } = req.body;
	let error;

	feedingHabits.forEach((habit) => {
		Customer.updateOne(
			{
				_id,
			},
			{
				$push: {
					feedingHabits: {
						idHabit: habit.idHabit,
						name: habit.name,
						typeTimes: habit.typeTimes,
						times: habit.times,
						descriptionHabit: habit.descriptionHabit,
					},
				},
			},
			(err) => {
				if (err) error = err;
			}
		);
	});
	if (error) {
		return res.status(400).json({
			ok: false,
			message: 'No se pudo ingresar los hábitos alimenticios.',
		});
	} else {
		res.status(201).json({
			ok: true,
			message: 'Se agregó correctamente las hábitos alimenticios.',
		});
	}
};
exports.addLab = async (req, res) => {
	const { _id, labs } = req.body;
	let error;

	labs.forEach((lab) => {
		Customer.updateOne(
			{
				_id,
			},
			{
				$push: {
					labs: {
						idLab: lab.idLab,
						name: lab.name,
						value: lab.value,
						unit: lab.unit,
					},
				},
			},
			(err) => {
				if (err) error = err;
			}
		);
	});
	if (error) {
		return res.status(400).json({
			ok: false,
			message: 'No se pudo ingresar los hábitos alimenticios.',
		});
	} else {
		res.status(201).json({
			ok: true,
			message: 'Se agregó correctamente las hábitos alimenticios.',
		});
	}
};
exports.listCustomer = async (req, res) => {
	try {
		const customer = await Customer.find({});
		res.status(200).json({
			ok: true,
			message: 'Se hizo la petición la manera correcta.',
			customer,
		});
	} catch (error) {
		res.status(400).json({ ok: false, error });
	}
};

exports.idCustomer = async (req, res) => {
	try {
		const customer = await Customer.findById({ _id: req.params.id });
		res.status(200).json({
			ok: true,
			message: 'El cliente fue encontra exitosamente.',
			customer,
		});
	} catch (error) {
		res
			.status(400)
			.json({ ok: false, message: 'No se pudo encontrar al cliente.' });
	}
};

exports.background = async (req, res) => {
	const { _id, personalHistory, familyBackground } = req.body;
	let error;

	Customer.updateOne(
		{ _id },
		{ $set: { personalHistory: personalHistory } },
		(err) => {
			if (error) error = err;
		}
	);
	Customer.updateOne(
		{ _id },
		{ $set: { familyBackground: familyBackground } },
		(err) => {
			if (error) error = err;
		}
	);

	if (error) {
		res
			.status(400)
			.json({ ok: true, message: 'No se pueden agregar los datos.' });
	} else {
		res
			.status(200)
			.json({ ok: true, message: 'Los datos fueron agregado con éxito.' });
	}
};

exports.listCustomerNutritionist = async (req, res) => {
	try {
		const customer = await Customer.find({
			nutritionistId: req.body.nutritionistId,
		});

		res.status(200).json({
			ok: true,
			message: 'Se encontró al cliente con éxito.',
			customer,
		});
	} catch (error) {
		res.status(400).json({ ok: true, message: 'No se encontró al cliente' });
	}
};

exports.formulas = async (req, res) => {
	const {
		_id,
		tallaCM,
		circunferenciaDeMuniecaCM,
		pesoActualKG,
		pesoACalcular,
		tipoDePeso,
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
			if (err)
				return res
					.status(400)
					.json({ ok: false, message: 'No se puede guardas los datos.' });
		}
	);
	if (pesoACalcular === 'Hamwi/Brocca') {
		//console.log(typeof tallaCM)
		if (tallaCM >= 152) {
			exito = await formulas.pesoIdealHamwi(
				_id,
				tallaCM,
				circunferenciaDeMuniecaCM
			);
			if (exito)
				return res.status(200).json({
					ok: true,
					message: 'Se agrego correctamente peso ideal Hamwi.',
				});
			else
				return res
					.status(400)
					.json({ ok: false, message: 'Ingrese los correctamente Hamwi.' });
		} else if (tallaCM < 152 && tallaCM >= 0) {
			console.log('Entro');
			exito = await formulas.pesoIdealBrocca(
				_id,
				tallaCM,
				circunferenciaDeMuniecaCM
			);
			if (exito)
				return res.status(200).json({
					ok: true,
					message: 'Se agrego correctamente peso ideal Brocca.',
				});
			else
				return res.status(400).json({
					ok: true,
					message: 'Verifique los datos para ingresar el Brocca correctamente.',
				});
		} else {
			return res
				.status(400)
				.json({ ok: false, message: 'Ingrese los correctamente de Brocca.' });
		}
	} else if (pesoACalcular === 'Clínica Mayo; West') {
		exito = await formulas.pesoIdealClinicaMayoWest(_id, tallaCM);
		if (exito)
			return res.status(200).json({
				ok: false,
				message: 'Se agrego correctamente peso ideal Clínica Mayo; West.',
			});
		else
			return res.status(400).json({
				ok: true,
				message:
					'Verifique los datos para ingresar el Clinica Mayo; West correctamente.',
			});
	} else if (pesoACalcular === 'IMC') {
		exito = await formulas.pesoIdealIMC(_id, tallaCM, tipoDePeso);
		if (exito)
			return res.status(200).json({
				ok: true,
				message: 'Se agrego correctamente peso ideal por IMC.',
			});
		else
			return res.status(400).json({
				ok: true,
				message: 'Verifique los datos para ingresar el IMC correctamente.',
			});
	} else if (pesoACalcular === 'Peso Ajustado') {
	}
	next();
};
