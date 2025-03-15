import mysql from 'mysql2/promise';

const configConnect = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
};

console.log("configConnect", configConnect);

const pool = mysql.createPool(configConnect) 

export default pool;
