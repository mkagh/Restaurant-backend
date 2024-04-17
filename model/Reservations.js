const mongoose = require("mongoose")

const ReservationsShema = new mongoose.Schema({
    year: {
        type: String,
        required: true,
    },
    month: {
        type: String,
    },
    day: {
        type: String,
    },
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    member: {
        type: Boolean,
    }
})

module.exports = mongoose.model("reservations", ReservationsShema)