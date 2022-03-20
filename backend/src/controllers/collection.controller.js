const Collection = require('../models/collection.model.js');
const express = require('express');

exports.list = async (req, res)=>{
    try {
        const collection = await Collection.find({});
        res.status(200).json({ok: true, collection})
    } catch (error) {
        res.status(400).json({ok: false, error});
    }
}