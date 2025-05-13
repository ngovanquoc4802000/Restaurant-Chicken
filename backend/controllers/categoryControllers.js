import pool from "../database/connectdatabase.js";

const getCategoryAll = async (req, res) => {
  try {
    const [data] = await pool.query(`SELECT * FROM category`);
    if (!data || data.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No categories found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Successfully retrieved all categories",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error retrieving categories", // More descriptive message
      error: error.message, // Include error detail for debugging
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

    const [data] = await pool.query(
      `
      SELECT * FROM category WHERE id = ?
      `,
      [categoryId]
    );

    if (!data || data.length === 0) {
      return res.status(404).send({
        success: false,
        message: `Category with ID ${categoryId} not found`,
      });
    }

    res.status(200).send({
      success: true,
      message: "Successfully retrieved category by ID",
      data: data[0],
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

    const statusTinyInt = status ? 1 : 0;

    const [result] = await pool.query(
      `INSERT INTO category
      (name, handle , image , status)
      VALUES(?,?,?,?)`,
      [name, handle, image, statusTinyInt]
    );

    if (!result || result.affectedRows === 0) {
      return res.status(500).send({
        success: false,
        message: "Failed to create category.",
      });
    }

    const newCategoryId = result.insertId;

    const [newData] = await pool.query(`SELECT * FROM category WHERE id = ?`, [
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
      data: newData[0],
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

    const statusTinyInt = status !== undefined ? (status ? 1 : 0) : undefined; // Only convert if status was provided

    let updateFields = [];
    let queryParams = [];

    if (name !== undefined) {
      updateFields.push("name = ?");
      queryParams.push(name);
    }
    if (handle !== undefined) {
      updateFields.push("handle = ?");
      queryParams.push(handle);
    }
    if (image !== undefined) {
      updateFields.push("image = ?");
      queryParams.push(image);
    }
    if (statusTinyInt !== undefined) {
      updateFields.push("status = ?");
      queryParams.push(statusTinyInt);
    }

    if (updateFields.length === 0) {
      return res.status(400).send({
        success: false,
        message: "No fields provided for update.",
      });
    }

    const updateQuery = `UPDATE category SET ${updateFields.join(
      ", "
    )} WHERE id = ?`;
    queryParams.push(categoryId);

    const [result] = await pool.query(updateQuery, queryParams);

    if (!result || result.affectedRows === 0) {
      const [existingCategory] = await pool.query(
        `SELECT id FROM category WHERE id = ?`,
        [categoryId]
      );

      if (existingCategory.length === 0) {
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

    const [updatedCategoryData] = await pool.query(
      `SELECT * FROM category WHERE id = ?`,
      [categoryId]
    );

    res.status(200).send({
      success: true,
      message: "Category updated successfully",
      data: updatedCategoryData[0],
    });
  } catch (error) {
    console.log(error);
    if (error.code === "ER_DUP_ENTRY") {
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
