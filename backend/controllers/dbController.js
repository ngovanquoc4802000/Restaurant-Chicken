import { execute } from "@getvim/execute";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config(); // Load environment variables

const username = process.env.DB_USER;
const database = process.env.DB_NAME;
const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;
const password = process.env.DB_PASSWORD;

export async function createPgDumpBackup() {
  const date = new Date();
  const today = `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
  const backupFile = `pg-backup-${database}-${today}.sql`;

  try {
    const command = `PGPASSWORD=${password} pg_dump -h ${dbHost} -p ${dbPort} -U ${username} -d ${database} > ${backupFile} `;
    await execute(command);
    console.log(`PostgreSQL backup created successfully: ${backupFile}`);
  } catch (error) {
    console.error("Error creating PostgreSQL backup:", error);
  }
}
