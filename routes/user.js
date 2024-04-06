const { Router } = require("express")
const userController = require("../controllers/user")
const router = Router()

router.route("/signin")
    .get(userController.renderSignin)
    .post(userController.handleSignin)

router.route("/signup").
    get(userController.renderSignup)
    .post(userController.handleSignup)

router.route("/logout").
    get(userController.logout)

module.exports = router