const ProcessorRepo = require('./cpuRepo');
const GraphicsRepo = require('./gpuRepo');
const MotherboardRepo = require('./moboRepo');
const MemoryRepo = require('./ramRepo');

class SeriesRepo{

    constructor(){};

    async getSeriesFilters(series){
        if (series === 'graphics')
        {
            var graphics = new GraphicsRepo();
            let data = await graphics.getSeries();            
            return data;
        }
        else if (series === 'processor')
        {
            var processor = new ProcessorRepo();
            let data = await processor.getSeries();
            return data;
        }
        else if (series === 'memory')
        {
            var memory = new MemoryRepo();
            let data = await memory.getSeries();
            return data;
        }
        else if (series === 'motherboard')
        {
            var motherboard = new MotherboardRepo();
            let data = await motherboard.getSeries();
            return data;
        }
    }

    async getSeriesItems(series, query){
        if (series === 'graphics')
        {
            var graphics = new GraphicsRepo();
            let data = await graphics.getSearchFilterIds(query);            
            return data;
        }
        else if (series === 'processor')
        {
            var processor = new ProcessorRepo();
            let data = await processor.getSearchFilteredIds(query);
            return data;
        }
        else if (series === 'memory')
        {
            var memory = new MemoryRepo();
            let data = await memory.getSearchFilteredIds(query);
            return data;
        }
        else if (series === 'motherboard')
        {
            var motherboard = new MotherboardRepo();
            let data = await motherboard.getSearchFilteredIds(query);
            return data;
        }
    }
}

module.exports = SeriesRepo;