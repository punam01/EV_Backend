const express = require("express")
const router = express.Router()
const { getCarById, getAllCars, getDesiredVariant, getAllVariants, compareCars, getAllModelsById } = require('../controllers/carsController')

router.get('/models', getAllModelsById);
router.route('/compare').get(compareCars);
router.route('/variant').get(getDesiredVariant);
router.route("/:id").get(getCarById)
router.route("/").get(getAllCars)
router.route("/variants/:modelName").get(getAllVariants)
module.exports = router