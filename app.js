const express = require('express');
const ejs = require('ejs');
const path = require('path');
var expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const mysql = require('mysql');
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const app = express();

app.use(express.urlencoded({ extended: false }))
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));
app.use(express.static(path.join(__dirname, 'views')));
app.set('view engine', 'ejs');
app.use(expressLayouts);


MongoClient.connect("mongodb+srv://hardlane2000:aftmt111@cluster0.eq3ni.mongodb.net/testusers?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true}, (err, db) => {
    if (err) console.log(err);
    console.log("Connected to Mongo...");
    var database = db.db("testusers");
    /* database.createCollection("testusers2", (err) => {
        if (err) console.log(err);
        console.log("Collection created");
    }); */
    database.collection("testusers2").findOne({ password: "asdasd" }, (err, result) => {
        if (err) console.log(err);
        console.log(result);
    })
})

const port = 3000;

app.listen(port, console.log("Server is up on port " + port));


