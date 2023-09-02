const mongoose = require("mongoose")

const ContactShema = new mongoose.Schema({
    name: {
        type: String,
        required: true

    },
    email: {
        type: String,
    },

    message: {
        type: String,
        required: true
    },

})

module.exports = mongoose.model("contact", ContactShema)