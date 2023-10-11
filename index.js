const express = require('express');
const DataStore = require('nedb');

const app = express();
app.listen(3000, () => console.log("listening at port 3000"));
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }))

const dataBase = new DataStore('database.db')
const dataBase2 = new DataStore('database2.db');
const dataBase3 = new DataStore('database3.db');

dataBase.loadDatabase();
dataBase2.loadDatabase();
dataBase3.loadDatabase();

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
    dataBase.remove({ userName: req.body.username }, {}, (err, numRemoved) => {

    })
})

// saving comments data to a new dataBase

app.post("/commentsData", (req, res) => {
    console.log("i got the reques ha ha ha ")
    dataBase2.find({}, (error, Data) => {
        if (error) {
            res.end();
            return;
        }

        dataBase2.insert({ Name: req.body.name, Comment: req.body.comment, bookCode: req.body.witchBook, commentPicture: req.body.commentPic })
        res.json({
            status: "200"
        });

    })
})

// showing all comment in pages

app.post("/dataForBookComments", (req, res) => {
    let targetComments = []

    dataBase2.find({}, (error, Data) => {
        if (error) {
            res.end();
            return;
        }

        for (let i = 0; i < Data.length; i++) {
            if (Data[i].bookCode == req.body.witchBook) {
                targetComments.push(Data[i]);
            }
        }
        console.log(targetComments);
        res.json(targetComments);
    })
})

app.post("/removeComment", (req, res) => {
    dataBase2.remove({ Comment: req.body.tempComment }, {}, (err, numRemoved) => {

    })
})

// insert 3 default shelf to the dataBase

app.post("/DefaultshelvesData", (req, res) => {
    console.log("i got the reques fuckersss default ")
    let isThereStatus;

    dataBase3.find({}, (error, Data) => {
        if (error) {
            res.end();
            return;
        }

        console.log(Data.length);

        if (Data.length == 0) {
            console.log("none");
            dataBase3.insert({ Name: "want to read", User: req.body.userName });
            dataBase3.insert({ Name: "reading", User: req.body.userName });
            dataBase3.insert({ Name: "readed", User: req.body.userName });
        }
        else {
            for (let i = 0; i < Data.length; i++) {
                console.log(Data[i]);
                if (Data[i].User == req.body.userName) {
                    isThereStatus = true
                    console.log(isThereStatus);
                    break;
                }
                else {
                    isThereStatus = false;
                    console.log(isThereStatus);
                }
            }
        }
        if (isThereStatus == false) {
            dataBase3.insert({ Name: "want to read", User: req.body.userName });
            dataBase3.insert({ Name: "reading", User: req.body.userName });
            dataBase3.insert({ Name: "readed", User: req.body.userName });
            isThereStatus = true;
        }
        else {
            return false
        }
    })
})

//adding new shelf to dataBase

app.post("/shelfCreator", (req, res) => {
    console.log("i got the reques fuckersss ")
    dataBase3.find({}, (error, Data) => {
        if (error) {
            res.end();
            return;
        }

        dataBase3.insert({ Name: req.body.shelfName2, User: req.body.user })
        res.json({
            status: "200"
        });
    })
})

app.post("/shelvesData", (req, res) => {
    let targetShelves = []
    dataBase3.find({}, (error, Data) => {
        if (error) {
            res.end();
            return;
        }

        for (let i = 0; i < Data.length; i++) {
            if (Data[i].User == req.body.userName) {
                targetShelves.push(Data[i]);
            }
        }
        console.log(targetShelves);
        res.json(targetShelves);
    })
})

//adding a book to shelf

app.post("/shelfAdd", (req, res) => {
    dataBase3.update({ User: req.body.userName, Name: req.body.shelfName }, { $push: { book: req.body.book } }, { multi: true }, function (err, numReplaced) {
    })
})