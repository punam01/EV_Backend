const express = require("express")
const router = express.Router()
const { getAllBlogs, getAllTags} = require('../controllers/blogController')

router.route('/').get(getAllBlogs)
router.route('/tags').get(getAllTags)
module.exports = router