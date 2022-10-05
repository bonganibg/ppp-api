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

            let products = getProductDTO(prods);
            res.status(200).json({
                products: products,
                search: searchFilters
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

const getProductDTO  = (prods) => {

  let products = [];
  prods.forEach((item) => {
    products.push({
      externalID: item.ExternalID,
      name: item.Name,
      price: item.Price,
      imageUri: item.ImageUri,
      category: item.Category,
      store: item.Store
    });
  });

  return products;
}

router.get('/:id/series', async (req, res) =>{
    category = getCategory(req.params.id);

    if (category > -1)
    {
        var series = new SeriesRepo();

        try{
            let seriesIds = await series.getSeriesItems(req.params.id, req.query);
            res.status(201).json({
                seriesExternalIDs: seriesIds
            });
        }
        catch(err){
            console.log(err);
            res.status(500);
        }
    }


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
