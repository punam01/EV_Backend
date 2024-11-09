const express = require("express")
const router = express.Router()

const bodyParser = require("body-parser");
const { getCarById, getAllCars, getDesiredVariant, getAllVariants, compareCars, getAllModelsById,getCarByModelId } = require('../controllers/carsController')


router.use(bodyParser.json());  // Parse JSON bodies

router.post('/getByModelId', getCarByModelId);
router.get('/models', getAllModelsById);
router.route('/compare').get(compareCars);
router.route('/variant').get(getDesiredVariant);
router.route("/:id").get(getCarById)
router.route("/").get(getAllCars)
router.route("/variants/:modelName").get(getAllVariants)

module.exports = router