const mongoose = require('mongoose');

const stringParams = {type: String, required: true};
const numberParams = {type: Number, required: true};

const series = mongoose.Schema({
    Category: numberParams,
    ID: stringParams,
    Range: stringParams,
    Series: stringParams,
    Model: stringParams,
    Socket: stringParams,
    Chipset: {
        type: Array,
        Name: stringParams
    },
    Cores: numberParams,
    Threads: numberParams,
    IntegratedGraphics: {
        type: Boolean,
        required: true
    },
    Cache: numberParams,
    BaseClock: numberParams,
    Turbo: numberParams
});

module.exports = mongoose.model('ProcessorSeries', series);