const express = require('express');
const cors = require('cors');
const { dbconnect } = require('./config/database');
const blog = require('./routes/blog');
const app = express();
require('dotenv').config();

dbconnect();

const PORT = process.env.PORT || 4001;

app.use(cors());
app.use(express.json());

app.use('/api',blog);

app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: "Your server is up and running....",
    });
});

app.listen(PORT, () => {
    console.log(`App is running at ${PORT}`);
});