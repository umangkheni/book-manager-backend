const mongoose = require("mongoose");

mongoose
    .connect("mongodb://localhost:27017/bookdb", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("Error connecting to MongoDB:", err));
