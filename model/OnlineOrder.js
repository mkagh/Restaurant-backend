const mongoose = require("mongoose")

const OrderShema = new mongoose.Schema({
    name: {
        type: String,
        required: true

    },
    email: {
        type: String,
    },
    adress: {
        type: String,
    },
    order: {
        type: Array,
    },
    total: {
        type: Number,
    },
    status: {
        type: Number,
        default: true
    },
    /*  total: {
         type: Number,
     }, */

})

module.exports = mongoose.model("order", OrderShema)