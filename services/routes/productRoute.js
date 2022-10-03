const express = require('express');
const router = express.Router();
const Product = require('../models/productModel');

router.get('', (req, res) => {
    Product.find()
    .then(async (prod) =>{
        res.status(200).json({
            data: prod
        });
    })
    .catch((err) => {
        res.status(401).json({
            error: err
        })
    });
});


module.exports = router;