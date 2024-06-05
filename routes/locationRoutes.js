const express = require("express")
const router = express.Router()
const { getLocationById,getLocationByQuery,updateTime } = require('../controllers/locationController')

router.route("/:id").get(getLocationById)
router.route("/").get(getLocationByQuery)
router.route("/").post(updateTime)
module.exports = router