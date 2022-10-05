const CPU = require('../models/series/cpuSeriesmodel');

const seriesFilters = {
    Range: new Set(),
    Series: new Set(),
    Model: new Set(),
    Socket: new Set(),
    Cores: new Set(),
    Threads: new Set(),
    Cache: new Set(),
    BaseClock: new Set(),
    Turbo: new Set()
}

class ProcessorRepo{
    constructor(){};

    async getSeries(){
        await this.loadSeries();
        return this.convertCpu();
    }

    async loadSeries(){
        await CPU.find()
        .then((data) => {
            data.forEach(product => {
                seriesFilters.Range.add(product.Range);
                seriesFilters.Series.add(product.Series);
                seriesFilters.Model.add(product.Model);
                seriesFilters.Socket.add(product.Socket);
                seriesFilters.Cores.add(product.Cores);
                seriesFilters.Threads.add(product.Threads);
                seriesFilters.Cache.add(product.Cache);
                seriesFilters.BaseClock.add(product.BaseClock);
                seriesFilters.Turbo.add(product.Turbo);
            });
        })
        .catch(err => {
            console.log(err);
        });
    }

    convertCpu(){
        const data = [
            {
              name: "Range",
              items: Array.from(seriesFilters.Range),
              query: "range",
              extension: ""
            },
            {
              name: "Series",
              items: Array.from(seriesFilters.Series),
              query: "series",
              extension: ""
            },
            {
              name: "Model",
              items:Array.from(seriesFilters.Model),
              query: "model",
              extension: ""
            },
            {
              name: "Socket",
              items: Array.from(seriesFilters.Socket),
              query: "socket",
              extension: ""
            },
            {
              name: "Cores",
              items:Array.from(seriesFilters.Cores),
              query: "cores",
              extension: ""
            },
            {
              name: "Thread",
              items: Array.from(seriesFilters.Threads),
              query: "threads",
              extension: ""
            },
            {
              name: "Cache",
              items:Array.from(seriesFilters.Cache),
              query: "cache",
              extension: "MB"
            },
            {
              name: "Base Clock",
              items: Array.from(seriesFilters.BaseClock),
              query: "baseClock",
              extension: "MHz"
            },
            {
              name: "Turbo",
              items:Array.from(seriesFilters.Turbo),
              query: "turbo",
              extension: "MHz"
            }
        ]

        return data;
    }

    async getSearchFilteredIds(data){
        let query = this.getSearchQuery(data);

        let ids = [];

        await CPU.find(query)
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

        if (data.range !== undefined)
        {
            query['Range'] = data.range;
        }
        if (data.series !== undefined)
        {
            query['Series'] = data.series;
        }
        if (data.model !== undefined)
        {
            query['Model'] = data.model;
        }
        if (data.socket !== undefined)
        {
            query['Socket'] = data.socket;
        }
        if (data.cores !== undefined)
        {
            query['Cores'] = data.cores;
        }
        if (data.threads !== undefined)
        {
            query['Threads'] = data.threads;
        }
        if (data.cache !== undefined)
        {
            query['Cache'] = data.cache;
        }
        if (data.baseClock !== undefined)
        {
            query['BaseClock'] = data.baseClock;
        }
        if (data.turbo !== undefined)
        {
            query['Turbo'] = data.turbo;
        }

        return query;
    }
}


module.exports = ProcessorRepo;
