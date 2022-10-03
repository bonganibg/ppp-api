const GPU = require('../models/series/gpuseriesmodel');
const CPU = require('../models/series/cpuSeriesmodel');
const RAM = require('../models/series/ramSeriesModel');
const MOBO = require('../models/series/moboSeriesModel');


const getSeriesFilters = (series) => {
    return getGPUSeries;
}

const getGPUSeries = () => {
    const seriesFilters = {        
        Series: new Set(),
        Model: new Set(),
        Cores: new Set(),
        BaseClock: new Set(),
        MemoryType: new Set(),
        MemorySize: new Set(),
        Interface: new Set()
    };

    GPU.find()
    .then((data) => {
        data.forEach(product => {
            seriesFilters.Series.add(product.Series);
            seriesFilters.Model.add(product.Model);
            seriesFilters.Cores.add(product.Cores);
            seriesFilters.BaseClock.add(product.BaseClock);
            seriesFilters.MemoryType.add(product.MemoryType);
            seriesFilters.MemorySize.add(product.MemorySize);
            seriesFilters.Interface.add(product.Interface);            
        });     
        
        return seriesFilters;
    });
    
}

module.exports = getGPUSeries;
