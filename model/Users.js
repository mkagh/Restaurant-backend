const mongoose = require("mongoose")

const UsersShema = new mongoose.Schema({
    username: {
        type: String,
        required: true

    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    ordered: {
        type: Array,
        default: []
    },

    price: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
    },
    status: {
        type: Boolean,
    },

})

module.exports = mongoose.model("user", UsersShema)