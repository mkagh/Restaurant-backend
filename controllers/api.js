const OnlineOrder = require("../model/OnlineOrder")
const Users = require("../model/Users")
const Contact = require("../model/Contact")
const Reservations = require("../model/Reservations")
const { createCustomError } = require("../errors/custom-api-error")
const asyncWrapper = require("../middleware/asyncWrapper")


const onlineOrder = asyncWrapper(async (req, res, next) => {

    const { name, email, adress, order } = req.body
    if (!name || !email || !adress || order.length === 0) {
        console.log("nesto fali")
        return next(createCustomError('all fields are required'))
    }
    const orderOnline = await OnlineOrder.create(req.body)

})

const contact = asyncWrapper(async (req, res) => {

    const contact = await Contact.create(req.body)
})

const postReservation = asyncWrapper(async (req, res) => {
    const { date } = req.body
    try {
        const reserve = await Reservations.create(date)

    }
    catch (err) {
        next(err)
    }

})

const getReservations = asyncWrapper(async (req, res, next) => {
    try {
        const reservation = await Reservations.find(req.query)
        res.json({ reservation })
    }
    catch (err) {
        next(err)

    }
})

const membersOrder = asyncWrapper(async (req, res) => {
    const { id: username } = req.params
    const timestamp = Date.now()
    req.body.ordered.push(new Date(timestamp))

    try {
        const usersOrder = await Users.findOneAndUpdate({ username },
            { $push: { ordered: req.body.ordered }, $inc: { price: req.body.total }, date: Date.now() },
            { new: true, runValidators: true })

    }
    catch (err) {
        next(err)

    }
})

module.exports = { onlineOrder, contact, postReservation, getReservations, membersOrder }