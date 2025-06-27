import express from "express";
import fs from "fs";
import multer from "multer";
import { Client } from 'pg';
import { createPgDumpBackup, importPgDumpBackup } from "../controllers/dbController.js";

const router = express.Router();

// Configure multer for file upload
const upload = multer({ dest: 'uploads/' });



router.post("/demo", upload.single('file'), async (req, res) => {
  try {

    
    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }

    const file = req.file;
    console.log("Uploaded file:", file);

    
    // return res.status(200).send(schemaSql);
    const result = await importPgDumpBackup(file.path);
    if (!result) {
      return res.status(500).send("Error importing schema.");
    }
    

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
  }
});

// create api read file sql from request form

// get dump file from database
router.get("/dump", async (req, res) => {
  const dumpFile = await createPgDumpBackup();
  res.status(200).send(dumpFile);
});

export default router;
