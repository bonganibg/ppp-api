const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const productRoute = require('./routes/productRoute');
const categoryRoute = require('./routes/categoryRoute');
const seriesRoute = require('./routes/seriesRoute');

const  app = express();

app.use(bodyParser.json());

var localDB = 'mongodb://localhost:27017/PC-Part-Prices-FINAL_TESt';
var cloudDB = 'mongodb+srv://Alphabg:rgRwyC6vNZVuftUD@maincluster.o7kgh.mongodb.net/?retryWrites=true&w=majority/ppp-database'

app.use(cors());

mongoose.connect(cloudDB, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log("Connected to database");

    app.use("/api/product", productRoute);
    app.use("/api/category", categoryRoute);
    app.use("/api/series", seriesRoute);
})
.catch(() => {
    console.log("FAILED to connect to database");
})

module.exports = app;

