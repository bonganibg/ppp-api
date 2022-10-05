const express = require('express');
const router = express.Router();

const GPU = require('../models/series/gpuseriesmodel');
const GpuSeries = require('../repos/gpuRepo');

router.get('/graphics/filters', (req,res) => {
    var gpu = new GpuSeries();
    var data = gpu.getSeries();

    res.status(201).json({
        data: data
    })
});


module.exports = router;