require('dotenv').config();
const express = require('express');
const app = express();
const connect = require("./db/connect")
const errorHandlerMiddleware = require('./middleware/errorHandler')
const api = require('./routes/api');
const auth = require('./routes/auth');
const passport = require('passport');
const session = require('express-session');
const ConfigLogin = require("./config/passport")

ConfigLogin(passport)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/v1', api);
app.use('/', auth);

app.use(errorHandlerMiddleware);

const start = async () => {
    await connect(process.env.MONGO_URI)
    app.listen(process.env.PORT, () => {
        console.log(`port is ${process.env.PORT}`)
    })
}
start()