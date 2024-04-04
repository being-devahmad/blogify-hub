const express = require('express')
const app = express()
const path = require('path')
const userRoute = require('./routes/user')
const port = 8000
const mongoose = require("mongoose")

// Middlewares
app.use(express.urlencoded({ extended: false }))
app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))

// Routes
app.use("/user", userRoute)

app.get('/', (req, res) => {
    res.render("home")
})

// Connection to DB
mongoose.connect("mongodb://localhost:27017/blogifyHub")
    .then((e) => console.log("Database connection successfull"))

app.listen(port, () => {
    console.log(`App listening on port ${port}!`)
})