// Budget API
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const budgetModel = require('./Models/budgetData');

app.use(cors());
app.use(bodyParser.json());
app.use('/', express.static("public"));

const MONGODB_URI = "mongodb://localhost:27017/budgetApp";

mongoose.connect(MONGODB_URI)
.then(() => {
    console.log("Connected to Database");
}).catch((err) => {
    console.log("Unable to connect to Database.\n", err);
})

app.get("/expenses", async (req, res) => {
    await budgetModel.find().then((data) => {
        res.json(data);
    }).catch((connectionError) => {
        console.error(connectionError);
        res.status(400).json({error:'Internal Server Error'})
    });
})

app.post('/expenses', async (req, res) => {
    const newItem = new budgetModel(req.body);
    await newItem.save().then((data) => {
        res.json(data);
    }).catch((connectionError) => {
        console.error(connectionError);
        res.status(400).json({error: connectionError.message})
    });
})

app.listen(port, () => {
    console.log(`API served at http://localhost:${port}`)
})