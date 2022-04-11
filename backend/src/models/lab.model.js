const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const labSchema = new Schema({
    nombre: {type: String, trim: true},
    unisex: {type: Boolean},
    minimo: {type: Number},
    maximo: {type: Number},
    minimoHombre: {type: Number},
    maximoHombre: {type: Number},
    minimoMujer: {type: Number},
    maximoMujer: {type: Number},
    unidad: {type: String, trim: true}
});

module.exports = mongoose.model("Lab", labSchema);