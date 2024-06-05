const express = require("express")
const router = express.Router()
const { getAllDemoBookings , getUserHistory,addDemoBooking } = require('../controllers/demoDriveController')

router.route("/list").get(getAllDemoBookings)
router.route("/:user_Id").get(getUserHistory)
router.route("/").post(addDemoBooking)
module.exports = router