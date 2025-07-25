export default () => ({
    port: parseInt(process.env.PORT || '3000'),
    jwtSecret: process.env.JWT_SECRET,
    dbHost: process.env.DB_HOST,
    dbPort: parseInt(process.env.DB_PORT || '5433'),
    dbUsername: process.env.DB_USERNAME,
    dbPassword: process.env.DB_PASSWORD,
    dbName: process.env.DB_NAME,
});