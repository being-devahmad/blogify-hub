const User = require("../models/user")

const renderSignin = (req, res) => {
    return res.render('signin')
}

const renderSignup = (req, res) => {
    return res.render('signup')
}

const handleSignup = async (req, res) => {
    const { fullName, email, password } = req.body;
    await User.create({
        fullName,
        email,
        password,
    });
    return res.redirect("/");
}

const handleSignin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const token = await User.matchPasswordAndGenerateToken(email, password);
        return res.cookie("token", token).redirect("/");
    } catch (error) {
        return res.render("signin", {
            error: "Incorrect Email or Password",
        });
    }
}

const logout = async (req, res) => {
    res.clearCookie("token").redirect("/")
}

module.exports =
    { renderSignin, renderSignup, handleSignup, handleSignin, logout }