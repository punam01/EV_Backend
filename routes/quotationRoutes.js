const express = require("express")
const router = express.Router()
const { getAllQuotations ,getQuotationById, getConfigDetailsById,deletedQuotation} = require('../controllers/quotationController')

router.route("/").get(getAllQuotations)
router.route("/:user_Id").get(getQuotationById)
router.route("/config/:qId").get(getConfigDetailsById)
router.route("/:id").delete(deletedQuotation)
module.exports = router