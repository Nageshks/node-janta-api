module.exports = {
    MONGO_URI: process.env.DB_URI,
    PORT: process.env.PORT || 5000,
    NODE_ENV: process.env.NODE_ENV,
    JWT_SECRET: process.env.JWT_SECRET
}