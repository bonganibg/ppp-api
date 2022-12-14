const MOBO = require('../models/series/moboSeriesModel');

const seriesFilters = {
    Dimm: new Set(),
    Socket: new Set(),
    Chipset: new Set()
}

class MotherboardRepo{
    constructor(){};

    async getSeries(){
        await this.loadSeries();
        return this.convertMobo();
    }

    async loadSeries(){
        await MOBO.find()
        .then((data) => {
            data.forEach(product => {
                seriesFilters.Dimm.add(product.Dimm);
                seriesFilters.Socket.add(product.Socket);
                seriesFilters.Chipset.add(product.Chipset);
            });
        })
        .catch(err => {
            console.log(err);
        });
    }

    convertMobo(){
        const data = [
            {
              name: "Dimm",
              items: Array.from(seriesFilters.Dimm),
              query: "dimm",
              extension: ""
            },
            {
              name: "Socket",
              items: Array.from(seriesFilters.Socket),
              query: "socket",
              extension: ""
            },
            {
              name: "Chipset",
              items: Array.from(seriesFilters.Chipset),
              query: "chipset",
              extension: ""
            }
        ]

        return data;
    }


    async getSearchFilteredIds(data){
        let query = this.getSearchQuery(data);

        let ids = [];

        await MOBO.find(query)
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

        if (data.dimm !== undefined)
        {
            query['Dimm'] = data.dimm;
        }
        if (data.socket !== undefined)
        {
            query['Socket'] = data.socket;
        }
        if (data.chipset !== undefined)
        {
            query['Chipset'] = data.chipset;
        }

        return query;
    }
}


module.exports = MotherboardRepo;
