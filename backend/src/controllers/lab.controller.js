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