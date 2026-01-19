import mysql from 'mysql2/promise';

// Veritabanı bağlantı havuzu
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'u136381340_solotr',
    password: process.env.DB_PASSWORD || 'ZJDg8556h$',
    database: process.env.DB_NAME || 'u136381340_solotr',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export default pool;
