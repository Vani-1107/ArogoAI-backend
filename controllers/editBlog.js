const Blog = require('../models/blog');
const axios = require('axios');


const editBlog = async (req, res) => {
    const { id } = req.params;
    const { title, details } = req.body;

    if (!title && !details) {
        return res.status(400).json({ error: 'At least one of title or details must be provided.' });
    }

    try {
        const blog = await Blog.findById(id);
        if (!blog) {
            return res.status(404).json({ error: 'Blog not found.' });
        }

        if (title) blog.title = title;
        if (details) {
            blog.details = details;

            const apiUrl =
                "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";
            const apiKey = process.env.GOOGLE_API_KEY;

            const response = await axios.post(`${apiUrl}?key=${apiKey}`, {
                contents: [
                    {
                        parts: [
                            { text: details },
                        ],
                    },
                ],
            });


            console.log("API Response:", response.data);

            const contentParts = response.data.candidates[0]?.content?.parts;
            if (!contentParts || contentParts.length === 0) {
                throw new Error("No content parts returned by the API.");
            }

            const summary = contentParts
                .map((part) => part.text)
                .join(" ")
                .trim();

            blog.summary = summary;
            if (!summary) {
                throw new Error("No summary generated by the API.");
            }
        }
        blog.lastEdited = Date.now();
        await blog.save();

        res.status(200).json({
            message: 'Blog updated successfully!',
            blog,
        });
    } catch (error) {
        console.error('Error updating blog:', error.message);
        res.status(500).json({ error: 'Failed to update blog.' });
    }
};

module.exports = { editBlog };
