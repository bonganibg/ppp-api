const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const productRoute = require('./routes/productRoute');

const  app = express();

app.use(bodyParser.json());

var localDB = 'mongodb://localhost:27017/PC-Part-Prices-Testing';

app.use(cors());

mongoose.connect(localDB, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log("Connected to database");

    app.use("/api/product", productRoute);
})
.catch(() => {
    console.log("FAILED to connect to database");
})

module.exports = app;

