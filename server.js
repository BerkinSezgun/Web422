const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { Movie } = require('./moviesDB');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: "API Listening" });
});

app.post('/data', (req, res) => {
    const data = req.body;
    res.json({ received: data });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});