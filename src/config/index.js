module.exports = {
    MONGO_URI: process.env.DB_URI,
    PORT: process.env.PORT || 5000,
    NODE_ENV: process.env.NODE_ENV,
    JWT_SECRET: process.env.JWT_SECRET,
    TEXT_LOCAL_API_KEY: process.env.TEXT_LOCAL_API_KEY,
    TEXT_LOCAL_API_SENDER: process.env.TEXT_LOCAL_API_SENDER,
    TEXT_LOCAL_API_URL: process.env.TEXT_LOCAL_API_URL
}