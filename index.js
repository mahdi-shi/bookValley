const express = require('express');
const DataStore = require('nedb');

const app = express();
app.listen(3000, () => console.log("listening at port 3000"));
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }))

const dataBase = new DataStore('database.db')
dataBase.loadDatabase();

//getting users data for sign up

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

//getting user's data for sign in

app.post("/signInUsersData", (req, res) => {
    console.log("i got the reques too")

    //checking that user's username is in dataBase or not

    dataBase.find({}, (error, Data) => {
        if (error) {
            res.end();
            return;
        }
        let userNameExsistingStatus = false;
        let passwordMatchigStatus = false;

        for (let i = 0; i < Data.length; i++) {
            if (Data[i].userName == req.body.userName) {
                userNameExsistingStatus = true;
                if (Data[i].password == req.body.Password) {
                    passwordMatchigStatus = true;
                    break;
                }
            }
        }

        if (userNameExsistingStatus == true && passwordMatchigStatus == true) {
            res.json({
                status: "it's there and password is correct"
            })
        }
        else if (userNameExsistingStatus == true && passwordMatchigStatus == false) {
            res.json({
                status: "it's there but password is incorrect"
            })
        }
        else {
            res.json({
                status: "it's not there"
            })
        }
    })
})

app.post("/dataForProfile", (req, res) => {
    let targetUser = []

    dataBase.find({}, (error, Data) => {
        if (error) {
            res.end();
            return;
        }

        for (let i = 0; i < Data.length; i++) {
            if (Data[i].userName == req.body.userName) {
                targetUser = Data[i];
                break;
            }
        }
        console.log(targetUser);
        res.json(targetUser);
    })
})

app.post("/dataForProfile", (req, res) => {
    let targetUser = []

    dataBase.find({}, (error, Data) => {
        if (error) {
            res.end();
            return;
        }

        for (let i = 0; i < Data.length; i++) {
            if (Data[i].userName == req.body.userName) {
                targetUser = Data[i];
                break;
            }
        }
        console.log(targetUser);
        res.json(targetUser);
    })
})

app.post("/saveProfilePic", (req, res) => {
    dataBase.update({ userName: req.body.username }, { $set: { image: req.body.image } }, { multi: true }, function (err, numReplaced) {
    })
})

app.post("/editProfileData", (req, res) => {
    dataBase.update({ userName: req.body.username }, { $set: { userName: req.body.newUsername, image: req.body.image } }, {}, function () {
    })

    let targetUser;
    dataBase.find({}, (error, Data) => {
        if (error) {
            res.end();
            return;
        }

        for (let i = 0; i < Data.length; i++) {
            if (Data[i].userName == req.body.newUsername) {
                targetUser = Data[i];
                break;
            }
        }
        res.json(targetUser);
    })
})

app.post("/removeUser", (req, res) => {
    dataBase.remove({userName: req.body.username }, {}, (err, numRemoved) => {

    })
})