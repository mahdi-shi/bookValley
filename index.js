const express = require('express');
const DataStore = require('nedb');

const app = express();
app.listen(3000 , () => console.log("listening at port 3000"));
app.use(express.static('public'));  
app.use(express.json({limit : '1mb'}))

const dataBase = new DataStore('database.db')
dataBase.loadDatabase();