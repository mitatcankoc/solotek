import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'solodb',
    password: 'SoloVDS2025',
    database: 'soloteknoloji',
    port: 3306,
    waitForConnections: true,
    connectionLimit: 5,
    queueLimit: 0
});

export default pool;
