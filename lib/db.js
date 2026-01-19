import mysql from 'mysql2/promise';

// Veritabanı bağlantı havuzu
const pool = mysql.createPool({
    host: 'localhost',
    user: 'u136381340_solotr',
    password: 'Solo2024test',
    database: 'u136381340_solotr',
    port: 3306,
    waitForConnections: true,
    connectionLimit: 5,
    queueLimit: 0
});

export default pool;
