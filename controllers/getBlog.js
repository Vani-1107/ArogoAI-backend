const Blog = require('../models/blog');

const getBlogById = async (req, res) => {
    const { id } = req.params;

    try {
        const blog = await Blog.findById(id);

        if (!blog) {
            return res.status(404).json({ error: 'Blog not found.' });
        }

        res.status(200).json(blog);
    } catch (error) {
        console.error('Error retrieving blog:', error.message);
        res.status(500).json({ error: 'Failed to retrieve blog.' });
    }
};

const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ postedAt: -1 });

        if (!blogs || blogs.length === 0) {
            return res.status(200).json({ message: 'No blogs found.', blogs: [] });
        }

        res.status(200).json(blogs);
    } catch (error) {
        console.error('Error retrieving blogs:', error.message);
        res.status(500).json({ error: 'Failed to retrieve blogs.' });
    }
};

module.exports = { getBlogById, getAllBlogs };