const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const collectionSchema = new Schema({
    codigo: { type: String, trim: true },
    tipo: { type: String, trim: true, default: null },
    alimento: { type: String, trim: true, required: true },
    cantidad: { type: String, trim: true, default: "100" },
    calorias: { type: String, trim: true, required: true },
    humedoPorcentaje: { type: String, trim: true, required: true },
    proteinaGramo: { type: String, trim: true, required: true },
    fosforoMiligramo: { type: String, trim: true },
    potasioMiligramo: { type: String, trim: true },
    grasasGramo: { type: String, trim: true },
    carbohidratoDisponiGramo: { type: String, trim: true },
    carbohidratoTotalesGramo: { type: String, trim: true },
    fibraDieteticaTotal: { type: String, trim: true },
    fibraDieteticaInsolub: { type: String, trim: true },
    cenizasGramo: { type: String, trim: true, required: true },
    calcioMiligramo: { type: String, trim: true },
    hierroMiligramo: { type: String, trim: true },
    magnesioMiligramo: { type: String, trim: true },
    incMiligramo: { type: String, trim: true },
    cobreMiligramo: { type: String, trim: true },
    sodioMiligramo: { type: String, trim: true },
    vitaminaAFR: { type: String, trim: true },
    carotenoEquivTotal: { type: String, trim: true },
    tiaminaMiligramo: { type: String, trim: true }
});

module.exports = mongoose.model("Collection", collectionSchema);