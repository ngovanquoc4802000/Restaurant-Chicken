import pool from "../database/connectdatabase.js";

const getCategoryAll = async (req, res) => {
  let client; 
  try {
    client = await pool.connect(); 
    const data = await client.query(`SELECT * FROM category`); 

    if (!data || data.rows.length === 0) {
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
  } finally {
    if (client) {
      client.release();
    }
  }
};

const getCategoryId = async (req, res) => {
  let client;
  try {
    const categoryId = req.params.id;

    if (!categoryId) {
      return res.status(400).send({
        success: false,
        message: "Category ID is required",
      });
    }

    client = await pool.connect();
    const data = await client.query(`SELECT * FROM category WHERE id = $1`, [categoryId]);

    if (!data || data.rows.length === 0) { 
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
  } finally {
    if (client) {
      client.release();
    }
  }
};

const createCategory = async (req, res) => {
  let client;
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

    client = await pool.connect();
    const insertQuery = `
      INSERT INTO category (name, handle, image, status)
      VALUES ($1, $2, $3, $4)
      RETURNING id;
    `;
    const result = await client.query(insertQuery, [
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

    const newData = await client.query(`SELECT * FROM category WHERE id = $1`, [
      newCategoryId,
    ]);

    if (!newData || newData.rows.length === 0) { 
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
    if (error.code === "23505") {
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
  } finally {
    if (client) {
      client.release();
    }
  }
};

const categoryPagination = async (req, res) => {
  let client;
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

    client = await pool.connect();

    const data = await client.query(
      `SELECT * FROM category LIMIT $1 OFFSET $2`,
      [limit, offset]
    );

    const totalPageData = await client.query(
      `SELECT count(*) as count FROM category`
    );

    const totalItems = totalPageData.rows[0]?.count || 0; 
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
      data: data.rows,
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
  } finally {
    if (client) {
      client.release();
    }
  }
};

const updateCategoryId = async (req, res) => {
  let client;
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
      queryParams.push(status);
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

    client = await pool.connect();
    const updateQuery = `UPDATE category SET ${updateFields.join(
      ", "
    )} WHERE id = $${finalIdParamIndex} RETURNING *;`;

    const result = await client.query(updateQuery, queryParams);

    if (!result || !result.rows || result.rows.length === 0) {
      const existingCategoryResult = await client.query(
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
  } finally {
    if (client) {
      client.release();
    }
  }
};

const deleteCategoryId = async (req, res) => {
  let client;
  try {
    const removeCategory = req.params.id;

    if (!removeCategory) {
      return res.status(400).send({
        success: false,
        message: "Category ID is required for deletion",
      });
    }

    client = await pool.connect();
    const relatedDishesResult = await client.query(
      `SELECT id FROM dishlist WHERE category_id = $1`,
      [removeCategory]
    );
    const relatedDishes = relatedDishesResult.rows;

    if (relatedDishes.length > 0) {
      return res.status(409).send({
        success: false,
        message:
          "Cannot delete category. There are dishes associated with this category. Please delete those dishes first.",
      });
    }

    const deleteResult = await client.query(
      `DELETE FROM category WHERE id = $1 RETURNING id`,
      [removeCategory]
    );

    if (deleteResult.rows.length === 0) {
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
  } finally {
    if (client) {
      client.release();
    }
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
