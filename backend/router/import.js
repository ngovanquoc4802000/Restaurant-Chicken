import express from "express";
import fs from "fs";
import multer from "multer";
import { Client } from 'pg';
import { createPgDumpBackup } from "../controllers/dbController.js";

const router = express.Router();

// Configure multer for file upload
const upload = multer({ dest: 'uploads/' });

const client = new Client({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "123456",
  database: process.env.DB_NAME || "postgres",
});

router.post("/demo", upload.single('file'), async (req, res) => {
  try {
    await client.connect();

    /* 
    curl --location 'http://localhost:7777/import/demo' \
    --form 'file=@"/Users/nguyenquocvuong/Downloads/restaurant_db_k1vr_full.sql"' 
    */
    
    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }

    const file = req.file;
    console.log("Uploaded file:", file);

    // Read file
    const schemaSql = fs.readFileSync(file.path, "utf8");
    
    // return res.status(200).send(schemaSql);
    await client.query(schemaSql);
    

    // Clean up uploaded file
    fs.unlinkSync(file.path);

    // console.log("Schema imported successfully.");
    res.status(200).send("Schema imported successfully.");
  } catch (err) {
    console.log("err", err);
    
    // Clean up uploaded file if it exists
    if (req.file && req.file.path) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (unlinkErr) {
        console.log("Error cleaning up file:", unlinkErr);
      }
    }
    
    res.status(500).send("Error importing schema.");
  } finally {
    await client.end();
  }
});

// create api read file sql from request form

// get dump file from database
router.get("/dump", async (req, res) => {
  const dumpFile = await createPgDumpBackup();
  res.status(200).send(dumpFile);
});

export default router;
