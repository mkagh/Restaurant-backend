const express = require("express")
const router = express.Router()
const { onlineOrder, contact, postReservation, getReservations, membersOrder } = require('../controllers/api')

router.route("/onlineorder").post(onlineOrder)
router.route("/contact").post(contact)
router.route("/reservations").post(postReservation).get(getReservations)

router.route("/:id").patch(membersOrder)


module.exports = router