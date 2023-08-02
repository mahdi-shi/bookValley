const express = require('express');
const DataStore = require('nedb');

const app = express();
app.listen(3000, () => console.log("listening at port 3000"));
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }))

const dataBase = new DataStore('database.db')
dataBase.loadDatabase();

app.post("/UsersData", (req, res) => {
    console.log("i got the reques")
    dataBase.find({}, (error, Data) => {
        if (error) {
            res.end();
            return;
        }
        let userNameExsistingStatus = true;

        for (let i = 0; i < Data.length; i++) {
            if (Data[i].userName == req.body.userName || Data[i].email == req.body.emailAddress) {
                userNameExsistingStatus = false;
                break;
            }
        }

        if (userNameExsistingStatus == false) {
            res.json({
                status: "it's there"
            })
        }
        else {
            dataBase.insert({ userName: req.body.userName, email: req.body.emailAddress, password: req.body.Password })
            res.json({
                status: "it's not there"
            })
        }
    })
})