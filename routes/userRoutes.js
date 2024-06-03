const express = require("express")
const router = express.Router()
const { getUserById } = require('../controllers/usersController')
router.route("/:id").get(getUserById)

module.exports = router