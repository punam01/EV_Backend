const express = require("express")
const router = express.Router()
const { getAllDemoBookings ,cancelBooking, getUserHistory,addDemoBooking } = require('../controllers/demoDriveController')

router.route("/list").get(getAllDemoBookings)
router.route("/:user_Id").get(getUserHistory)
router.route("/").post(addDemoBooking)
router.route("/").put(cancelBooking)

module.exports = router