import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: process.env.PASSWORD ||  "123456",
    database: process.env.DATABASE ||  "chicken_db",
}) 

export default pool;
