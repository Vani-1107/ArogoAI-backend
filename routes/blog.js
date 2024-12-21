const express = require('express');
const router = express.Router();

const { createBlog } = require('../controllers/createBlog');
const { getBlogById, getAllBlogs } = require('../controllers/getBlog');
const { editBlog } = require('../controllers/editBlog');
const { deleteBlog } = require('../controllers/deleteBlog');

router.post('/createBlog',createBlog);
router.get('/getBlog/:id',getBlogById);
router.get('/getAllBlogs',getAllBlogs);
router.put('/editBlog/:id',editBlog);
router.delete('/deleteBlog/:id',deleteBlog);

module.exports = router;