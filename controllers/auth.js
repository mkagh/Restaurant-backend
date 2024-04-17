const Users = require("../model/Users")
const passport = require("passport")
const bcrypt = require('bcrypt');
const { createCustomError } = require("../errors/custom-api-error")

const register = async (req, res, next) => {
    const { username, email, password, confirmPassword } = req.body
    const hashedPwd = await bcrypt.hash(password, 10);
    const postUser = {
        ...req.body,
        password: hashedPwd
    }
    const existingUser = await Users.findOne({
        $or: [{ username: req.body.username }, { email: req.body.email }]
    });
    if (existingUser) {
        next(createCustomError("User like this already exists"))
    }
    else if (!username || !email || !password) {
        next(createCustomError("every field must be filed"))
    }
    else if (password.length < 2) {
        next(createCustomError("you need bigger password"))
    }
    else if (password !== confirmPassword) {
        next(createCustomError("pasword doesn't match"))
    }
    else {
        try {
            const user = await Users.create(postUser)
            console.log("rado radi")
            res.cookie('userData', JSON.stringify(user), { maxAge: 86400000 });
            res.json({ user })
        }
        catch (err) {
            next(err)
        }
    }
}

const login = async (req, res, next) => {
    passport.authenticate("local", (err, user) => {
        if (err) {
            return next(createCustomError('some error'))
        }
        if (!user) {
            return next(createCustomError('Authentication failed'))
        }
        const userCookie = { id: user.id, username: user.username, email: user.email };
        res.cookie('userData', JSON.stringify(userCookie), { maxAge: 86400000 }); // Expires in 24 hours
        return res.redirect('/');
    })(req, res, next);
}

const logout = (req, res) => {
    res.cookie('userData', '', { expires: new Date(0), path: '/' });
    res.json({ nesto: "nesto" })
}

module.exports = {register, login,logout }
