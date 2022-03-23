const Customer = require('../models/customer.model.js');
const Psychobiological = require("../models/psycho.model.js");
const Lab = require('../models/lab.model.js');
const express = require('express');
const { default: mongoose } = require('mongoose');

exports.addCustomer = async (req, res) => {
    try {
        const customer = new Customer(req.body);
        await customer.save();

        res.status(201).json({ ok: true, message: 'Cliente agregado con éxito' });
    } catch (error) {
        if (error.code === 11000) return res.status(400).json({ ok: false, message: 'Verifique la información del usuario.' });

        res.status(400).json({ ok: false, message: 'No se pudo ingresar al cliente.' });
    }
}
exports.listID = async (req, res, _id) => {
    try {
        const customer = await Customer.findById({ _id })
    } catch (error) {

    }
}
exports.addPsychologicalHabit = async (req, res) => {

    const { _id, psychologicalHabit, allergies, supplements, intolerances } = req.body;
    let error;

    psychologicalHabit.forEach(async (habit) => {  
        const psycho = await Psychobiological.findById({_id: habit.idHabit});
        if(psycho){
            Customer.updateOne(
                {
                    _id
                }, {
                $push: {
                    "psychologicalHabit": {
                        idHabit: habit.idHabit,
                        typeTimes: habit.typeTimes,
                        times: habit.times,
                        color: habit.color,
                        descriptionHabit: habit.descriptionHabit
                    }
                }
            }, (err) => {
                if (err) {
                    error = err;
                }
            }
            );
        }
    });
    
    if (error) {
        return res.status(400).json({ ok: false, message: 'No se pudo ingresar los hábitos alimenticios.' });
    } else {
        res.status(201).json({ ok: true, message: "Se agregó correctamente las hábitos alimenticios." })
    }
}

exports.addFeedingHabits = async (req, res) => {
    const { _id, feedingHabits } = req.body;
    let error;
    
    feedingHabits.forEach(habit => {
        Customer.updateOne({
            _id
        }, {
            $push: {
                'feedingHabits': {
                    idHabit: habit.idHabit,
                    typeTimes: habit.typeTimes,
                    times: habit.times,
                    descriptionHabit: habit.descriptionHabit
                }
            }
        }, (err) => {
            if (err) error = err;
        })
    });
    if (error) {
        return res.status(400).json({ ok: false, message: 'No se pudo ingresar los hábitos alimenticios.' });
    } else {
        res.status(201).json({ ok: true, message: "Se agregó correctamente las hábitos alimenticios." });
    }
}

exports.listCustomer = async (req, res) => {
    try {
        const customer = await Customer.find({});
        res.status(200).json({ ok: true, message: "Se hizo la petición la manera correcta.", customer });
        
    } catch (error) {
        res.status(400).json({ ok: false, error });
    }
}

exports.idCustomer = async (req, res) => {
    try {
        const { _id } = req.body;
        const customer = await Customer.findById({ _id });
        res.status(200).json({ ok: true, message: "El cliente fue encontra exitosamente.", customer });
    } catch (error) {
        res.status(400).json({ ok: false, message: "No se pudo encontrar al cliente.", customer });
    }
}

exports.background = async (req, res) =>{
    const {_id, personalHistory, familyBackground} = req.body;
    let error;

    Customer.updateOne({_id}, { $set: { 'personalHistory': personalHistory}}, (err)=>{ if(error) error = err})
    Customer.updateOne({_id}, { $set: { 'familyBackground': familyBackground}}, (err)=>{ if(error) error = err})
    
    if(error){
        res.status(400).json({ok: true, message: "No se pueden agregar los datos."});
    }else{

        res.status(200).json({ok: true, message: "Los datos fueron agregado con éxito."});
    }
}

exports.listCustomerNutritionist = async (req, res)=>{
    try {
        const customer = await Customer.find({nutritionistId: req.body.nutritionistId});

        res.status(200).json({ok: true, message: "Se encontró al cliente con éxito.", customer})
    } catch (error) {
        res.status(400).json({ok: true, message: "No se encontró al cliente"})
        
    }
}