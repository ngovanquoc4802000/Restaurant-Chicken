import pool from "../database/connectdatabase.js";

const getCatetoryAll = async (req, res) => {
  try {
    const data = await pool.query(`SELECT * FROM category`);
    if (!data) {
      return res.status(404).send({
        success: false,
        message: "404 not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "get success api All",
      data: data[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error category",
    });
  }
};
const getCategoryId = async (req, res) => {
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
       SELECT * FROM category WHERE id = ?
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
      data: data[0],
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
    const { name, handle, image } = req.body;
    if (!name || !handle) {
      return res.status(403).send({
        success: false,
        message: "Invalid Error",
      });
    }
    const data = await pool.query(
      `INSERT INTO category 
      (name, handle , image) 
      VALUES(?,?,?)`,
      [name, handle, image]
    );
    if (!data) {
      return res.status(404).send({
        success: false,
        message: "404 not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "success api ",
      data: data[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error",
    });
  }
};
const categoryPagination = async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const offset = (page - 1) * limit;
    const [data] = await pool.query(
      `SELECT * FROM category  limit ? offset ? `,
      [+limit, +offset]
    );
    const [totalPageData] = await pool.query(
      `SELECT count(*) as count from api_db`
    );
    const totalPage = Math.ceil(+totalPageData[0]?.count / limit);
    console.log(totalPage);
    res.status(200).send({
      success: true,
      message: "pagination success",
      data: data,
      pagination: {
        page: +page,
        limit: +limit,
        totalPage,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "lỗi phân trang",
    });
  }
};
const updateCategoryId = async (req, res) => {
  try {
    const categoryTable = req.params.id;
    if (!categoryTable) {
      return res.status(403).send({
        success: false,
        message: "403 not found",
      });
    }
    const { name, handle, image } = req.body;
    const data = await pool.query(
      `
      UPDATE category SET
      name = ? ,
      handle = ?,
      image = ?
      WHERE id = ?
      `,
      [name, handle, image]
    );
    if (!data) {
      return res.status(404).send({
        success: false,
        message: "404 not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "success api UpdateCategory",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error Api Category",
    });
  }
};
const deleteCategoryId = async (req, res) => {
  try {
    const removeCategory = req.params.id;
    if (!removeCategory) {
      return res.status(404).send({
        success: false,
        message: "404 , Not found deleteCategory",
      });
    }
    // Kiểm tra xem có món ăn nào liên quan đến danh mục này không
    const [relatedDishes] = await pool.query(
      `SELECT id FROM dishlist WHERE category_id = ?`,
      [removeCategory]
    );
    if (relatedDishes.length > 0) {
      return res.status(400).send({
        success: false,
        message: "Cannot delete category. There are dishes associated with this category. Please delete those dishes first.",
      });
    }
   
    const [deleteResult] = await pool.query(`DELETE FROM category WHERE id = ?`, [removeCategory]);
    if (deleteResult.affectedRows === 0) {
      return res.status(404).send({
        success: false,
        message: "Category not found. The category ID may not exist.",
      });
    }
    res.status(200).send({
      success: true,
      message: "Success delete Id category",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error deleteCategory",
    });
  }
};

export default {
  getCatetoryAll,
  getCategoryId,
  createCategory,
  categoryPagination,
  updateCategoryId,
  deleteCategoryId,
};
