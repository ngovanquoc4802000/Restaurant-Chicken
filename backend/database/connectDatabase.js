import { Pool } from "pg"

const pool = new Pool({
    host: process.env.host || "localhost",
    port: process.env.port || "5432",
    user: process.env.user || "postgres",
    password: process.env.PASSWORD ||  "123456",
    database: process.env.DATABASE ||  "postgres"
}) 

export default pool;
