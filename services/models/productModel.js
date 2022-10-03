const mongoose = require('mongoose');

const stringParams = {type: String, required: true};
const numberParams = {type: Number, required: true};

const product = mongoose.Schema({
    ID: stringParams,
    ExternalID: stringParams,
    Store: numberParams,
    Category: numberParams,
    Manufacturer: numberParams,
    Brand: numberParams,
    SeriesExternalID: stringParams,
    Name: stringParams,
    Price: numberParams,
    ImageUri: stringParams,
    Link: stringParams,
    PriceHistory: {
        type: Array,
        Price: numberParams,
        UpdatedOn: {
            type: Date            
        }
    }
});

module.exports = mongoose.model('Products', product);