import { execute } from "@getvim/execute";
import dotenv from "dotenv";
import pool from "../database/connectdatabase.js";
dotenv.config(); 

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

export async function importPgDumpBackup(backupFile) {
  try {
    const command = `PGPASSWORD=${password} psql -h ${dbHost} -p ${dbPort} -U ${username} -d ${database} -f ${backupFile}`;
    await execute(command);
    console.log(`PostgreSQL backup imported successfully: ${backupFile}`);
    return true;
  } catch (error) {
    console.error("Error importing PostgreSQL backup:", error);
    return false;
  }
}

export async function getTestDishlist(req, res) {
  try {
    const insertDishlist = await pool.query(`SELECT * FROM dishlist limit 10`);

    const dishes = insertDishlist.rows;

    if (!dishes || dishes.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No dishlist found.",
      });
    }

    const dataWithImages = await Promise.all(
      dishes.map(async (dish) => {
        const imageResult = await pool.query(
          `SELECT * FROM dishlist_images WHERE id_dishlist = $1`,
          [dish.id]
        );
        const images = imageResult.rows;
        return { ...dish, images };
      })
    );

    res.status(200).send({
      success: true,
      message: "Successfully retrieved all dishlists with images.",
      data: dataWithImages,
    });
  } catch (error) {
    console.error("Error in getDishlistAll:", error);
    return res.status(500).send({
      success: false,
      message: "Error retrieving dishlists.",
      error: error.message,
    });
  }
}