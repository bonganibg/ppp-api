const mongoose = require('mongoose');

const stringParams = {type: String, required: true};
const numberParams = {type: Number, required: true};


const series = mongoose.Schema({
    ID: stringParams,
    Category: numberParams,
    Dimm: stringParams,
    Socket: stringParams,
    Chipset: stringParams
});

module.exports = mongoose.model('MotherboardSeries', series);