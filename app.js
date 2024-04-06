// app.js
const express = require('express');
const app = express();
const path = require('path');
const userRoute = require('./routes/user');
const blogRoute = require('./routes/blog');
const port = 8000;
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { checkForAuthenticationCookie } = require('./middlewares/authentication');

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(cookieParser());
app.use(checkForAuthenticationCookie('token'));

// Routes
app.use("/user", userRoute);
app.use("/blog", blogRoute);

app.get('/', (req, res) => {
    res.render("home", { user: req.user });
});

// Connection to DB
mongoose.connect("mongodb://localhost:27017/blogifyHub")
    .then(() => console.log("Database connection successful"));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
});
