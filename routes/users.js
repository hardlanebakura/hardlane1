const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get("/login", (req, res) => {
    res.render("login");
})

router.get("/register", (req, res) => {
    res.render("register");
})

router.get("/dashboard", (req, res) => {
    res.render("dashboard");
})

router.post("/register", (req, res) => {
    const { name, email, password, password2 } = req.body;
    var errors = [];
    if (!name || !email || !password || !password2) errors.push({ msg: "Please fill in all fields." })
    if (name.length < 6) errors.push({ msg: "Name is too short." })
    if (name.length > 10) errors.push({ msg: "Name is too long." })
    if (email.length < 6) errors.push({ msg: "Email is too short." })
    if (email.length > 10) errors.push({ msg: "Email is too long." })
    if (password.length < 6) errors.push({ msg: "Password is too short." })
    if (password.length > 10) errors.push({ msg: "Password is too long." })
    if (password !== password2) errors.push({ msg: "Passwords don't match." })
    if (errors.length == 0) {
        console.log("Successful registration");
        User.findOne({ email: email }, (err, user) => {
            if(err) console.log(err);
            if (user) {
                console.log("Email is taken");
                errors.push({ msg: "Email is already taken" })
                res.render("register", {
                    errors,
                    name,
                    email,
                    password,
                    password2
                })
                ;
            }
        });

    }
    else {
        console.log("Failed registration");
        res.render("register", {
            errors,
            name,
            email,
            password,
            password2
        })
    }
})

module.exports = router;