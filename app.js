require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const indexRoutes = require("./src/routes/index");
const authRoutes = require("./src/routes/auth");
const apiRoutes = require("./src/routes/api");
const { PORT, MONGO_URI, NODE_ENV } = require("./src/config");
const requireLogin = require('./src/middleware/requireLogin');

// startups
const app = express();
require("./src/models/user")
require("./src/models/socialMedia")
app.use(bodyParser.json({ limit: '3mb', extended: true }))
// app.use(bodyParser.urlencoded({ limit: '3mb', extended: true }))
if (NODE_ENV === "development") {
    const morgan = require("morgan");
    app.use(morgan("dev"));
}
app.use('/', indexRoutes);
app.use('/auth/', authRoutes);
app.use('/api/', requireLogin, apiRoutes);

mongoose.set('strictQuery', false);
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
    .catch((error) => console.log(`${error} did not connect`));