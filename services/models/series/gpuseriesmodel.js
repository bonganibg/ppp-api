const mongoose = require('mongoose');

const stringParams = {type: String, required: true};
const numberParams = {type: Number, required: true};

const series = mongoose.Schema({
    ID: stringParams,
    Category: numberParams,
    Series: stringParams,
    Model: stringParams,
    Cores: numberParams,
    BaseClock: numberParams,
    MemoryType: stringParams,
    MemorySize: numberParams,
    Interface: stringParams
});

module.exports = mongoose.model('', series);