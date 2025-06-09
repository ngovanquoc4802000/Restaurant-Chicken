import pool from "../database/connectdatabase.js";

const getCategoryAll = async (req, res) => {
  try {
    const data = await pool.query(`SELECT * FROM category`);
    if (!data || data.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No categories found",
      });
    }
    const result = data.rows;

    res.status(200).send({
      success: true,
      message: "Successfully retrieved all categories",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error retrieving categories", 
      error: error.message,
    });
  }
};

const getCategoryId = async (req, res) => {
  try {
    const categoryId = req.params.id;

    if (!categoryId) {
      return res.status(400).send({
        success: false,
        message: "Category ID is required",
      });
    }
    const insertQuery = `SELECT * FROM category WHERE id = $1`;

    const data = await pool.query(insertQuery, [categoryId]);

    if (!data || data.length === 0) {
      return res.status(404).send({
        success: false,
        message: `Category with ID ${categoryId} not found`,
      });
    }
    const result = data.rows[0];
    res.status(200).send({
      success: true,
      message: "Successfully retrieved category by ID",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error retrieving category by ID",
      error: error.message,
    });
  }
};

const createCategory = async (req, res) => {
  try {
    const { name, handle, image, status = true } = req.body;

    if (!name || !handle) {
      return res.status(400).send({
        success: false,
        message: "Name and handle are required fields",
      });
    }

    if (status !== undefined && typeof status !== "boolean") {
      return res.status(400).send({
        success: false,
        message: "Status must be a boolean value (true/false).",
      });
    }

    const insertQuery = `
      INSERT INTO category (name, handle, image, status)
      VALUES ($1, $2, $3, $4)
      RETURNING id;
    `;
    const result = await pool.query(insertQuery, [
      name,
      handle,
      image,
     status,
    ]);

    if (!result || !result.rows || result.rows.length === 0) {
      return res.status(500).send({
        success: false,
        message: "Failed to create category or retrieve new ID.",
      });
    }

    const newCategoryId = result.rows[0].id;

    const newData = await pool.query(`SELECT * FROM category WHERE id = $1`, [
      newCategoryId,
    ]);

    if (!newData || newData.length === 0) {
      return res.status(500).send({
        success: false,
        message: "Failed to retrieve newly created category.",
      });
    }

    res.status(201).send({
      success: true,
      message: "Category created successfully",
      data: newData.rows[0],
    });
  } catch (error) {
    console.log(error);
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).send({
        success: false,
        message: "Category with this handle already exists.",
      });
    }
    res.status(500).send({
      success: false,
      message: "Error creating category",
      error: error.message,
    });
  }
};

const categoryPagination = async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    if (isNaN(page) || isNaN(limit) || page < 1 || limit < 1) {
      return res.status(400).send({
        success: false,
        message: "Invalid page or limit parameters. Must be positive integers.",
      });
    }

    const offset = (page - 1) * limit;

    const [data] = await pool.query(
      `SELECT * FROM category LIMIT ? OFFSET ? `,
      [limit, offset]
    );

    const [totalPageData] = await pool.query(
      `SELECT count(*) as count FROM category`
    );

    const totalItems = totalPageData[0]?.count || 0;
    const totalPage = Math.ceil(totalItems / limit);

    if (page > totalPage && totalPage > 0) {
      return res.status(404).send({
        success: false,
        message: `Page ${page} not found. Max available page is ${totalPage}.`,
      });
    }

    res.status(200).send({
      success: true,
      message: "Categories pagination success",
      data: data,
      pagination: {
        page: page,
        limit: limit,
        totalItems: totalItems,
        totalPage: totalPage,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error fetching paginated categories",
      error: error.message,
    });
  }
};

const updateCategoryId = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const { name, handle, image, status } = req.body;

    if (!categoryId) {
      return res.status(400).send({
        success: false,
        message: "Category ID is required for update",
      });
    }

    if (status !== undefined && typeof status !== "boolean") {
      return res.status(400).send({
        success: false,
        message: "Status must be a boolean value (true/false).",
      });
    }

    const statusValue = status;

    let updateFields = [];
    let queryParams = [];
    let paramIndex = 1;

    if (name !== undefined) {
      updateFields.push(`name = $${paramIndex}`);
      queryParams.push(name);
      paramIndex++;
    }
    if (handle !== undefined) {
      updateFields.push(`handle = $${paramIndex}`);
      queryParams.push(handle);
      paramIndex++;
    }
    if (image !== undefined) {
      updateFields.push(`image = $${paramIndex}`);
      queryParams.push(image);
      paramIndex++;
    }
    if (status !== undefined) {
      updateFields.push(`status = $${paramIndex}`);
      queryParams.push(statusValue);
      paramIndex++;
    }

    if (updateFields.length === 0) {
      return res.status(400).send({
        success: false,
        message: "No fields provided for update.",
      });
    }

    const finalIdParamIndex = paramIndex;
    queryParams.push(categoryId);

    const updateQuery = `UPDATE category SET ${updateFields.join(
      ", "
    )} WHERE id = $${finalIdParamIndex} RETURNING *;`;

    const result = await pool.query(updateQuery, queryParams);

    if (!result || !result.rows || result.rows.length === 0) {
      const existingCategoryResult = await pool.query(
        `SELECT id FROM category WHERE id = $1`,
        [categoryId]
      );

      if (
        !existingCategoryResult.rows ||
        existingCategoryResult.rows.length === 0
      ) {
        return res.status(404).send({
          success: false,
          message: `Category with ID ${categoryId} not found.`,
        });
      } else {
        return res.status(200).send({
          success: false,
          message: "Category data was already up to date, no changes made.",
        });
      }
    }
    const updatedCategoryData = result.rows[0];

    res.status(200).send({
      success: true,
      message: "Category updated successfully",
      data: updatedCategoryData,
    });
  } catch (error) {
    console.error("Error updating category:", error);

    // --- Sửa lỗi 5: Mã lỗi cho UNIQUE constraint violation trong PostgreSQL là "23505" ---
    if (error.code === "23505") {
      return res.status(409).send({
        success: false,
        message: "Update failed: Category with this handle already exists.",
      });
    }
    return res.status(500).send({
      success: false,
      message: "Error updating category",
      error: error.message,
    });
  }
};

const deleteCategoryId = async (req, res) => {
  try {
    const removeCategory = req.params.id;

    if (!removeCategory) {
      return res.status(400).send({
        success: false,
        message: "Category ID is required for deletion",
      });
    }
    const [relatedDishes] = await pool.query(
      `SELECT id FROM dishlist WHERE category_id = ?`,
      [removeCategory]
    );

    if (relatedDishes.length > 0) {
      return res.status(409).send({
        success: false,
        message:
          "Cannot delete category. There are dishes associated with this category. Please delete those dishes first.",
      });
    }

    const [deleteResult] = await pool.query(
      `DELETE FROM category WHERE id = ?`,
      [removeCategory]
    );

    if (deleteResult.affectedRows === 0) {
      return res.status(404).send({
        success: false,
        message: `Category with ID ${removeCategory} not found.`,
      });
    }

    res.status(200).send({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error deleting category",
      error: error.message,
    });
  }
};

export default {
  getCategoryAll,
  getCategoryId,
  createCategory,
  categoryPagination,
  updateCategoryId,
  deleteCategoryId,
};
