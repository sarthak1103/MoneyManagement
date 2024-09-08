const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const app = express();
const authRoutes = require('./routes/authRoutes');
const transactionRoutes = require('./routes/transactionRoutes');

app.use(express.json());
app.use(cors());

const MONGO_URI = process.env.MONGO_URI;


// Default route
app.get('/', (req, res) => {
    res.send('Hello from Node API Server');
});

// Route middlewares
app.use('/api', authRoutes);
app.use('/api', transactionRoutes);

// MongoDB connection
mongoose.connect(MONGO_URI)
    .then(() => {
        console.log("Connected to the database");
        app.listen(8000, () => {
            console.log("Server is running on port 8000");
        });
    }).catch(() => {
        console.log("Connection failed");
    });
