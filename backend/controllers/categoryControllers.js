import pool from '../database/connexion.js';

const categoryTableAll = async (req,res) => {
    try  {
      const [data] = await pool.query('SELECT * FROM category_db');
      if(!data) {
        return res.status(404).send({
          success: false,
          message : "No Records found"
        })
      }
      res.status(200).send({
        success: true,
        message: "Show All Danh_muc",
        data
      })
    } catch(error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error, in Get All category All",
        error
      })
    }
}

const createCategory = async(req , res) => {
  try {
     const { name , handle , email , address } = req.body;
     if(!name || !handle || !email || !address) {
        return res.status(500).send({
          success: false,
          message: "Invalid Please Fields"
        })
     }
     const data = await pool.query(
      `INSERT INTO category_db 
      (name, handle , email , address) VALUES (? , ? , ? , ?)`,
      [name, handle , email , address]
     ) ;
     if(!data) {
      return res.status(404).send({
        success: false,
        message: "bị lỗi trong code này"
      })
     }
     res.status(201).send({
      success : false,
      message: "đã tạo thành công"
     })
  } catch(error) {
     console.log(error);
     res.status(500).send({
      success: false,
      message: "Error, in Post category",
      error
    })
  }
} 
export default {categoryTableAll , createCategory};