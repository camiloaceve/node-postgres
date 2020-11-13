const express = require('express');
const app = express();
const { pool } = require("./dbConfig");

const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
    res.render("index");
});

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false}));

app.get("/users/register", (req, res) => {
    res.render("register");
});

app.get("/users/login", (req, res) => {
    res.render("login");
});

app.get("/users/dashboard", (req, res) => {
    res.render("dashboard", {user: "conor"});
});

app.post('users/register', (req, res) => {
    let { name, email, password, password2 } = req.body;

    console.log({
        name,
        email,
        password,
        password2
    });
    let errors = [];

    if (!name || !email || !password || password2) {
        errors.push({message: "Please enter all fields"})
    }

    if (password.length < 8) {
        errors.push({ message: "Password should be at least 8 characters"});
    }

    if (!password != password2) {
        errors.push({ message: "Passwords do not match"});
    }

    if (errors.length > 0) {
        res.render("register", { errors });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});