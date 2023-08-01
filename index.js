const express = require('express');
const DataStore = require('nedb');

const app = express();
app.listen(3000 , () => console.log("listening at port 3000"));
app.use(express.static('public'));  
app.use(express.json({limit : '1mb'}))

const dataBase = new DataStore('database.db')
dataBase.loadDatabase();

app.post("/UsersData",(req,res) => {
    console.log("i got the reques")
    console.log(req.body)
    dataBase.insert({userName : req.body.userName,email : req.body.emailAddress,password : req.body.Password})
    dataBase.find({},(err,data) => {
        if(err){
            res.end();
            return;
        }
        req.json(data)
    })
})