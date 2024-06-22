const Blog = require("../models/Blog")

const getAllBlogs=async(req,res)=>{
    try {
        const blogs = await Blog.find({});
        res.json(blogs)
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
}

const getAllTags = async (req, res) => {
    try {
        const tags = await Blog.distinct('tag');
        res.status(200).json(tags);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllBlogs,
    getAllTags
  }