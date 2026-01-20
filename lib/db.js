import mysql from 'mysql2/promise';

// Veritabanı bağlantı havuzu - IPv4 zorla
const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'u136381340_solotr',
    password: 'ZJDg8556h$',
    database: 'u136381340_solotr',
    port: 3306,
    waitForConnections: true,
    connectionLimit: 5,
    queueLimit: 0,
    socketPath: undefined // TCP kullan, socket değil
});

export default pool;
