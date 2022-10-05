const express = require('express');
const router = express.Router();

const Product = require('../models/productModel');
const GraphicsRepo = require('../repos/gpuRepo');
const SeriesRepo = require('../repos/seriesRepo');

router.get('/:id', async (req, res) => {

    let searchQuery = req.params.id.toString();
    let category = -1;

    if (searchQuery === 'graphics'){
        category = 0;
    }
    else if (searchQuery === 'processor'){
        category = 1;
    }
    else if (searchQuery === 'memory'){
        category = 2;
    }
    else if (searchQuery === 'motherboard'){
        category = 3;
    }
    

    if (category > -1)
    {        
        Product.find()
        .where('Category', category)
        .then(async (prods) => {
            var seriesRepo = new SeriesRepo();
            var searchData = await seriesRepo.getSeriesFilters(searchQuery);
            var searchFilters = 
            {                                
                filters: searchData
            }

            res.status(200).json({
                products: prods,
                searchFilters: searchFilters
            });
        })
        .catch((err) => {
            res.status(401).json({
                error: err
            });
        });
    }
    else 
    {
        res.status(404).json({
                error: "No products Found"
            });
    }
});

router.get('/:id/series', (req, res) =>{
    category = getCategory(req.params.id);

    console.log(req.query);    
    
    res.sendStatus(204);
    
});


const getCategory = (searchQuery) => {    
    if (searchQuery === 'graphics'){
        return 0;
    }
    else if (searchQuery === 'processor'){
        return 1;
    }
    else if (searchQuery === 'memory'){
        return 2;
    }
    else if (searchQuery === 'motherboard'){
        return 3;
    }

    return -1;
}

module.exports = router;
