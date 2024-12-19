const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const booksRouter = require('./routes/books');
const authRouter = require('./routes/auth');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
    .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected")) 
    .catch((err) => {
        console.error("MongoDB connection error:", err.message);
        process.exit(1);
    });

// Routes
app.use('/api/books', booksRouter);
app.use('/api/auth', authRouter);

// Check if the port is already in use before starting the server
const server = app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use.`);
        process.exit(1);
    }
});
