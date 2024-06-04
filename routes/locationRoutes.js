const express = require("express")
const router = express.Router()
const { getLocationById, getLocationByState,getLocationByPin } = require('../controllers/locationController')

router.route("/:id").get(getLocationById)
router.route("/:state").get(getLocationByState)
module.exports = router