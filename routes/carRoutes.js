const express = require("express")
const router = express.Router()
const { getCarById, getAllCars } = require('../controllers/carsController')

router.route("/:id").get(getCarById)
router.route("/").get(getAllCars)
module.exports = router