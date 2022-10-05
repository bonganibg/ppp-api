const { query } = require('express');
const GPU = require('../models/series/gpuseriesmodel');

const seriesFilters = {
    Series: new Set(),
    Model: new Set(),
    Cores: new Set(),
    BaseClock: new Set(),
    MemoryType: new Set(),
    MemorySize: new Set(),
    Interface: new Set()
};

class GraphicsRepo{

    constructor(){};

    async getSeries(series){
        await this.loadSeries();
        return this.convertGpu();
    }

    async loadSeries(){
        await GPU.find()
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
        })
        .catch(err => {
            console.log(err);
        });
    }

    convertGpu(){
        const data = [
            {
              name: "Series",
              items: Array.from(seriesFilters.Series)
            },
            {
              name: "Model",
              items: Array.from(seriesFilters.Model)
            },
            {
              name: "Cores",
              items: Array.from(seriesFilters.Cores)
            },
            {
              name: "BaseClock",
              items: Array.from(seriesFilters.BaseClock)
            },
            {
              name: "MemoryType",
              items: Array.from(seriesFilters.MemoryType)
            },
            {
              name: "MemorySize",
              items: Array.from(seriesFilters.MemorySize)
            },
            {
              name: "Interface",
              items: Array.from(seriesFilters.Interface)
            },
        ]

        return data;
    }

    async getSearchFilterIds(data){
        let query = this.getSearchQuery(data);

        let ids =[];

        await GPU.find(query)
        .then((response) => {
            response.forEach(item => {
                ids.push(item.ID);
            });
            return ids;
        })
        .catch((err) => {
            console.log(err);
        });

        return ids;
    }


    getSearchQuery(data){

        let query = {};

        if (data.series !== undefined)
        {
            query['Series'] = data.series
        }
        if (data.model !== undefined)
        {
            query["Model"] = data.model
        }
        if (data.cores !== undefined)
        {
            query["Cores"] = data.cores
        }
        if (data.baseClock !== undefined)
        {
            query["BaseClock"] = data.baseClock
        }
        if (data.memoryType !== undefined)
        {
            query["MemoryType"] = data.memoryType
        }
        if (data.memorySize !== undefined)
        {
            query["MemorySize"] = data.memorySize
        }
        if (data.interface !== undefined)
        {
            query["Interface"] = data.interface
        }

        return query;
    }
}

module.exports = GraphicsRepo;
