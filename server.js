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
    .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/bookmanager")
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error(err));

// Routes
app.use('/api/books', booksRouter);
app.use('/api/auth', authRouter);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
