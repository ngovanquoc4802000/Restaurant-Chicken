/* import express from 'express';
import tablesRouter from '../controllers/categoryControllers.js'
import multer from 'multer';


const router = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname)
  }
})
const upload = multer({storage: storage})

router.get('/', async(req,res) => {
  try {
    const [data] = await pool.query("SELECT * FROM api_db");
    if (!data) {
      return res.status(404).send({
        success: false,
        message: "No Records found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Show All category",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error, in Get All category All",
      error,
    });
  }
});
router.post("/",upload.single("file") , async (req, res) => {
  try{
    const ImageName = req.file.filename;
    const {name, handle} = req.body;
    if(!ImageName || !name || !handle) {
      return res.status(403).send({
        success: false,
        message: "Invalid Error"
      })
    }
    const data = await pool.query(
      `INSERT INTO api_db (image, name , handle) VALUES(?,?,?)`,
      [ImageName, name, handle]
    )
    if(!data) {
      return res.status(404).send({
        success: false,
        message: "404 not found"
      })
    }
    res.status(200).send({
      success: true,
      message: "success api "
    })
   } catch(error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error"
    })
  }
});

router.get('/:id', async(req,res) => {
  try {
    const categoryId = req.params.id;
    if (!categoryId) {
      return res.status(403).send({
        success: false,
        message: "Invalid , Please connect fields",
      });
    }
    const [data] = await pool.query(
      `
       SELECT * FROM api_db WHERE id=?
      `,
      categoryId
    );
    if (!data) {
      return res.status(404).send({
        success: false,
        message: "404 not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "success categoryId",
      data: data[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Kết nối thất bại",
    });
  }
})


export default router; */