import mysql from 'mysql2/promise';
const configConnect = {
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
};

console.log("configConnect", configConnect);

const pool = mysql.createPool(configConnect) 

export default pool;
