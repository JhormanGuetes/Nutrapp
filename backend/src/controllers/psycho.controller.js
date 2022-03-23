const Psichobioligical = require('../models/psycho.model.js');
const express = require('express');

exports.list = async (req, res)=>{
    try {
        const psycho = await Psichobioligical.find({});
        res.status(200).json({ok: true, psycho});
    } catch (error) {
        res.status(400).json({ok: false, error})
    }
}

exports.listID = async (req, res)=>{
    try {
        const {_id} = req.body;
        const psycho = await Psichobioligical.findById({_id});
        res.status(200).json({ok: true, psycho});
    } catch (error) {
        res.status(400).json({ok: false, error});
    }
}