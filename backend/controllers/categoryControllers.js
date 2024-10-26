import pool from "../database/connexion.js";

const categoryTableAll = async (req, res) => {
  try {
    const [data] = await pool.query("SELECT * FROM category_db");
    if (!data) {
      return res.status(404).send({
        success: false,
        message: "No Records found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Show All Danh_muc",
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
};

const categoryTableId = async (req, res) => {
  try {
    const categoryId = req.params.id;
    if (!categoryId) {
      return res.status(500).send({
        success: false,
        message: "Invalid , Please connect fields",
      });
    }
    const [data] = await pool.query(
      `
       SELECT * FROM category_db WHERE id=?
      `,
      [categoryId]
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
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Kết nối thất bại",
    });
  }
};

const createCategory = async (req, res) => {
  try {
    const { id, name, handle, email, address } = req.body;
    if ((!id, !name || !handle || !email || !address)) {
      return res.status(500).send({
        success: false,
        message: "Invalid 500 category",
      });
    }
    const data = await pool.query(
      `INSERT INTO category_db
       (id,name , handle, email , address)
      VALUES (? , ? , ? , ? , ?)
      `,
      [id, name, handle, email, address]
    );
    if (!data) {
      return res.status(404).send({
        success: false,
        message: "Please , Not found Category_db",
      });
    }
    res.status(201).send({
      success: true,
      message: "Success createCategory",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error 500",
    });
  }
};

const updateCategory = async (req, res) => {
  try {
    const upCategory = req.params.id;
    if (!upCategory) {
      return res.status(500).send({
        success: false,
        message: "Please, is not found",
      });
    }
    const { name, handle, email, address } = req.body;
    const data = await pool.query(
      `UPDATE category_db SET 
      name = ? ,
       handle = ?, 
       email = ? ,
        address = ? WHERE id = ?`,
        [name , handle , email , address , upCategory]
    );
    if(!data) {
      return res.status(404).send({
        success: false,
        message: "Error updateCategory"
      })
    }
    res.status(200).send({
      success: true,
      message: "Success Update"
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error updateCategory",
    });
  }
};

const deleteCategory = async(req,res) => {
   try {
      const removeCategory = req.params.id;
      if(!removeCategory) {
        return res.status(404).send({
          success: false,
          message: "404 , Not found deleteCategory"
        })
      }
      await pool.query(`DELETE FROM category_db WHERE id =?`,[removeCategory])
      res.status(200).send({
        success: true,
        message: "Success delete Id category"
      }) 
   } catch(error) {
    console.log(error)
    return res.status(500).send({
      success : true,
      message: "Error deleteCategory"
    })
   }
}

export default {
  categoryTableAll,
  categoryTableId,
  createCategory,
  updateCategory,
  deleteCategory
};
