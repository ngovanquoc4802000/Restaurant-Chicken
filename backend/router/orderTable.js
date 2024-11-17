/* import express from "express";
import orderTableControllers from "../controllers/orderTableControllers.js";
import Upload from "../database/config.js";
const router = express.Router();

// POST Route (Assuming intended functionality)
router.get('/', orderTableControllers.orderTableAll)
router.post('/upload', Upload.single('file'), async(req,res) => {
  const file = req.file;
  res.status(200).json(file.filename)
} )


export default router; */