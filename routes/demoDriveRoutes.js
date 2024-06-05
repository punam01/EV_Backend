const express = require("express")
const router = express.Router()
const { getAllDemoBookings,rescheduleBooking,cancelBooking, getUserHistory,addDemoBooking } = require('../controllers/demoDriveController')

router.route("/list").get(getAllDemoBookings)
router.route("/:user_Id").get(getUserHistory)
router.route("/").post(addDemoBooking)
router.route("/").put(cancelBooking)
router.route("/reschedule").put(rescheduleBooking)

module.exports = router