const RAM = require('../models/series/ramSeriesModel');

const seriesFilters = {
    Dimm: new Set(),
    Capacity: new Set(),
    Speed: new Set()    
}

class MemoryRepo{
    constructor(){};

    async getSeries(){
        await this.loadSeries();
        return this.convertRam();
    }

    async loadSeries(){
        await RAM.find()        
        .then((data) => {
            data.forEach(product => {
                seriesFilters.Dimm.add(product.Dimm);
                seriesFilters.Capacity.add(product.Capacity);
                seriesFilters.Speed.add(product.Speed);
            });                 
        })
        .catch(err => {
            console.log(err);
        });
    }

    convertRam(){
        const data = {
            Dimm: Array.from(seriesFilters.Dimm),
            Capacity: Array.from(seriesFilters.Capacity),
            Speed: Array.from(seriesFilters.Speed)
        }

        return data;
    }


    async getSearchFilteredIds(data){
        let query = this.getSearchQuery(data);

        let ids = [];

        await RAM.find(query)
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
        if (data.capacity !== undefined)
        {
            query['Capacity'] = data.Capacity;
        }
        if (data.speed !== undefined)
        {
            query['Speed'] = data.Speed;
        }

        return query;
    }

}


module.exports = MemoryRepo;