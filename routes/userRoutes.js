const express = require("express")
const router = express.Router()
const {verifyUserDetails, getUserById, registerUser, updateUser, deleteUser, getUserByCustomId ,updateUserByCustomId,checkUserByPhoneNumber} = require('../controllers/usersController')


router.post('/verify', verifyUserDetails);
router.get('/check-phone', checkUserByPhoneNumber);
router.get("/:id",getUserById)
router.post('/', registerUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.get("/get/:customId",getUserByCustomId)
router.put('/update/:customId', updateUserByCustomId);

module.exports = router