const express = require('express');
const router = express.Router();

const seriesRepo = require('../repos/seriesRepo');


const Product = require('../models/productModel');


router.get('/:id', (req, res) => {

    let searchQuery = req.params.id.toString();
    let category = -1;

    if (searchQuery === 'graphics')
    {
        category = 0;
    }
    else if (searchQuery === 'processor')
    {
        category = 1;
    }
    else if (searchQuery === 'memory')
    {
        category = 2;
    }
    else if (searchQuery === 'motherboard')
    {
        category = 3;
    }
    

    if (category > -1)
    {
        var seriesFilters = seriesRepo();

        Product.find()
        .where('Category', category)
        .then((prods) => {
            res.status(200).json({
                products: prods,
                search: seriesFilters
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


module.exports = router;
