// Load environment variables from a .env file
require('dotenv').config();

// Import dependencies
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// Import configuration settings
const { PORT, MONGO_URI, NODE_ENV } = require("./src/config");

// Import middleware
const requireLogin = require('./src/middleware/requireLogin');

// Create Express app
const app = express();

// Connect to MongoDB using Mongoose
mongoose.set('strictQuery', false); // Disable strict mode for queries
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
    console.log(`Mongoose connected`);
    app.listen(PORT, () => {
        console.log(`Server Running on Port: http://localhost:${PORT}`);
    });
    
});
mongoose.connection.on("error", (err) => {
    console.log(`${err} did not connect`);
});

// Load Mongoose models
require("./src/models/user")
require("./src/models/socialMedia")

// Set up middleware
app.use(bodyParser.json({ limit: '3mb', extended: true }))
// app.use(bodyParser.urlencoded({ limit: '3mb', extended: true }))
if (NODE_ENV === "development") {
    // Use morgan middleware to log requests in development mode
    const morgan = require("morgan");
    app.use(morgan("dev"));
}

// Set up routes
app.use('/', require("./src/routes/index"));
app.use('/auth/', require("./src/routes/auth"));

// Require login for API routes
app.use('/api/', requireLogin, require("./src/routes/api"));

