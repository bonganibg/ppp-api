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
        const data = {
            Dimm: Array.from(seriesFilters.Dimm),
            Socket: Array.from(seriesFilters.Socket),
            Chipset: Array.from(seriesFilters.Chipset)
        }

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
            query['Dimm'] = data.Dimm;
        }
        if (data.socket !== undefined)
        {
            query['Socket'] = data.Socket;
        }
        if (data.chipset !== undefined)
        {
            query['Chipset'] = data.Chipset;
        }

        return query;
    }
}


module.exports = MotherboardRepo;