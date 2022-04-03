const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const labSchema = new Schema({
    nombre: {type: String, trim: true},
    unisex: {type: Boolean},
    descripcion: {type: String, trim: true}
});

module.exports = mongoose.model("Lab", labSchema);