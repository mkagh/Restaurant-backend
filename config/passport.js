const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const Users = require("../model/Users")
const bcrypt = require('bcryptjs')

const ConfigLogin = (passport) => {
    passport.use(
        new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
            Users.findOne({ email: email })
                .then(async (user) => {
                    if (!user) {
                        done(null, false, { msg: "There is no user like this" })
                    }
                    const match = await bcrypt.compare(password, user.password);
                    if (match) {
                        return done(null, user);
                    }
                    if (password !== user.password) {
                        return done(null, false, { msg: 'Password incorrect' });
                    }
                })
        })
    )
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        Users.findById(id)
            .exec()
            .then(user => {
                done(null, user);
            })
            .catch(err => {
                done(err);
            });
    });;
}
module.exports = ConfigLogin 