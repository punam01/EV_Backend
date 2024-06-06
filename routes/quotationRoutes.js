const express = require("express")
const router = express.Router()
const { getAllQuotations ,getQuotationById, getConfigDetailsById,deletedQuotation,updateQuotation} = require('../controllers/quotationController')

router.route("/").get(getAllQuotations)
router.route("/:user_Id").get(getQuotationById)
router.route("/config/:qId").get(getConfigDetailsById)
router.route("/:id").delete(deletedQuotation)
router.route("/:id").put(updateQuotation)
module.exports = router