const express = require("express")
const router = express.Router()

const { Register, Login, Logout } = require('../controllers/auth')

router.route("/register").post(Register)
router.route("/login").post(Login)
router.route("/logout").get(Logout)


module.exports = router
