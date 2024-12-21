const Blog = require('../models/blog');

const deleteBlog = async (req, res) => {
    const { id } = req.params;
  
    try {
      const blog = await Blog.findByIdAndDelete(id);
  
      if (!blog) {
        return res.status(404).json({ error: 'Blog not found.' });
      }
  
      res.status(200).json({
        message: 'Blog deleted successfully!',
        blog,
      });
    } catch (error) {
      console.error('Error deleting blog:', error.message);
      res.status(500).json({ error: 'Failed to delete blog.' });
    }
  };
  
  module.exports = { deleteBlog };