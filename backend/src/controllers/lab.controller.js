const Lab = require('../models/lab.model.js');
const express = require('express');

exports.list = async (req, res)=>{
    try {
        const labs = await Lab.find({});
        res.status(200).json({ok: true, labs});
    } catch (error) {
        res.status(400).json({ok: false, error})
    }
}

exports.listID = async (req, res)=>{
    try {
        const {_id} = req.body;
        const lab = await Lab.findById({_id});
        res.status(200).json({ok: true, lab});
    } catch (error) {
        res.status(400).json({ok: false, error});
    }
}