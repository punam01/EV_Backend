const express = require("express")
const router = express.Router()
const { getAllDemoBookings,rescheduleBooking,cancelBooking, getUserHistory,createDemoBooking } = require('../controllers/demoDriveController')


router.route("/").post(createDemoBooking)
router.route("/list").get(getAllDemoBookings)
router.route("/history").post(getUserHistory)
router.route("/").put(cancelBooking)
router.route("/reschedule").put(rescheduleBooking)

module.exports = router