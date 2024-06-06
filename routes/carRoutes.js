const express = require("express")
const router = express.Router()
const { getCarById, getAllCars ,getDesiredVariant,getAllVariants} = require('../controllers/carsController')

router.route("/:id").get(getCarById)
router.route("/").get(getAllCars)
router.route("/variants/:modelName").get(getAllVariants)
module.exports = router