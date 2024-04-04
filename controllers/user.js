const User = require("../models/user")

const renderSignin = (req, res) => {
    return res.render('signin')
}

const renderSignup = (req, res) => {
    return res.render('signup')
}

const handleSignup = async (req, res) => {
    const { fullName, email, password } = req.body

    await User.create({
        fullName,
        email,
        password,
    })

    return res.redirect("/")
}

const handleSignin = async (req, res) => {
    const { email, password } = req.body
    const user = await User.matchPassword(email, password)
    console.log("user---->", user)
    return res.redirect("/")
}

module.exports =
    { renderSignin, renderSignup, handleSignup, handleSignin }