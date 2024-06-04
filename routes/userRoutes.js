const express = require("express")
const router = express.Router()
const { getUserById, registerUser, updateUser, deleteUser } = require('../controllers/usersController')

router.route("/:id").get(getUserById)
router.post('/', registerUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
module.exports = router