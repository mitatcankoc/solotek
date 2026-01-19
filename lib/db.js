import mysql from 'mysql2/promise';

// Veritabanı bağlantı havuzu
const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'u136381340_solotr',
    password: 'ZJDg8556h$',
    database: 'u136381340_solotr',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
});

export default pool;
