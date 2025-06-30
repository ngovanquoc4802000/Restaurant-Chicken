import pool from "../database/connectdatabase.js";


const formatDbTimestamp = () => {
  return new Date().toISOString();
};

export const getDishlistAll = async (req, res) => {
  try {
    const insertDishlist = await pool.query(`SELECT * FROM dishlist`);

    const dishes = insertDishlist.rows;

    if (!dishes || dishes.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No dishlist found.",
      });
    }

    const dataWithImages = await Promise.all(
      dishes.map(async (dish) => {
        const imageResult = await pool.query(
          `SELECT * FROM dishlist_images WHERE id_dishlist = $1`,
          [dish.id]
        );
        const images = imageResult.rows;
        return { ...dish, images };
      })
    );

    res.status(200).send({
      success: true,
      message: "Successfully retrieved all dishlists with images.",
      data: dataWithImages,
    });
  } catch (error) {
    console.error("Error in getDishlistAll:", error);
    return res.status(500).send({
      success: false,
      message: "Error retrieving dishlists.",
      error: error.message,
    });
  }
};

export const getDishlistId = async (req, res) => {
  const dishId = req.params.id;

  if (!dishId) {
    return res.status(400).send({
      success: false,
      message: "Dish ID is required.",
    });
  }
  try {
    const dishResult = await pool.query(
      `SELECT * FROM dishlist WHERE id = $1`,
      [dishId]
    );

    const dish = dishResult.rows[0];

    if (!dish) {
      return res.status(404).send({
        success: false,
        message: `Dish with ID ${dishId} not found.`,
      });
    }

    const imagesResult = await pool.query(
      `SELECT * FROM dishlist_images WHERE id_dishlist = $1`,
      [dishId]
    );
    const images = imagesResult.rows;

    res.status(200).send({
      success: true,
      message: "Successfully retrieved dish by ID.",
      data: {
        ...dish,
        images,
      },
    });
  } catch (error) {
    console.error("Error in getDishlistId:", error);
    res.status(500).send({
      success: false,
      message: "Error retrieving dish by ID.",
      error: error.message,
    });
  }
};

export const createDishlist = async (req, res) => {
  const {
    category_id,
    name,
    title,
    currency = "VND",
    price,
    description,
    images = [],
    status = true,
  } = req.body;

  if (!name || !title || price === undefined) {
    return res.status(400).send({
      success: false,
      message: "Please provide name, title, and price.",
    });
  }

  if (typeof status !== "boolean") {
    return res.status(400).send({
      success: false,
      message: "Status must be a boolean value (true/false).",
    });
  }

  const numericPrice = parseFloat(price);
  if (isNaN(numericPrice)) {
    return res.status(400).send({
      success: false,
      message: "Price must be a valid number.",
    });
  }

  const now = formatDbTimestamp();

  try {
    const insertDishResult = await pool.query(
      `INSERT INTO dishlist
       (category_id, name, title, currency, price, description, status, create_at, update_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING *`,
      [
        category_id,
        name,
        title,
        currency,
        numericPrice,
        description,
        status,
        now,
        now,
      ]
    );
    const newDish = insertDishResult.rows[0];

    if (!newDish) {
      return res.status(500).send({
        success: false,
        message: "Failed to create dishlist: No data returned after insert.",
      });
    }

    const dishId = newDish.id;
    const insertedImages = [];

    if (images.length > 0) {
      for (const image of images) {
        const { alt_text, image: imageUrl } = image;
        if (imageUrl) {
          const imageInsertResult = await pool.query(
            `INSERT INTO dishlist_images (id_dishlist, alt_text, image, create_at, update_at)
             VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [dishId, alt_text || null, imageUrl, now, now]
          );
          insertedImages.push(imageInsertResult.rows[0]);
        }
      }
    }

    res.status(201).send({
      success: true,
      message: "Dishlist created successfully.",
      data: {
        ...newDish,
        images: insertedImages,
      },
    });
  } catch (error) {
    console.error("Error creating dishlist:", error);

    if (error.code === "23505") {
      return res.status(409).send({
        success: false,
        message:
          "A dish with this name/title combination already exists (or ID sequence is out of sync).",
      });
    } else if (error.code === "23502") {
      return res.status(400).send({
        success: false,
        message: `Missing required data: ${error.column} cannot be null.`,
      });
    } else if (error.code === "23503") {
      return res.status(400).send({
        success: false,
        message: "Invalid category_id provided. Category does not exist.",
      });
    }

    res.status(500).send({
      success: false,
      message: "Error creating dishlist.",
      error: error.message,
    });
  }
};

export const updateDishlistId = async (req, res) => {
  const dishId = req.params.id;
  const {
    category_id,
    name,
    title,
    currency,
    price,
    description,
    status,
    images = [],
  } = req.body;

  if (!dishId) {
    return res.status(400).send({
      success: false,
      message: "Dish ID is required for update.",
    });
  }

  let updateFields = [];
  let queryParams = [];
  let paramIndex = 1;
  const now = formatDbTimestamp();

  updateFields.push(`update_at = $${paramIndex}`);
  queryParams.push(now);
  paramIndex++;

  if (category_id !== undefined) {
    updateFields.push(`category_id = $${paramIndex}`);
    queryParams.push(category_id);
    paramIndex++;
  }
  if (name !== undefined) {
    updateFields.push(`name = $${paramIndex}`);
    queryParams.push(name);
    paramIndex++;
  }
  if (title !== undefined) {
    updateFields.push(`title = $${paramIndex}`);
    queryParams.push(title);
    paramIndex++;
  }
  if (currency !== undefined) {
    updateFields.push(`currency = $${paramIndex}`);
    queryParams.push(currency);
    paramIndex++;
  }
  if (price !== undefined) {
    const numericPrice = parseFloat(price);
    if (isNaN(numericPrice)) {
      return res.status(400).send({
        success: false,
        message: "Price must be a valid number.",
      });
    }
    updateFields.push(`price = $${paramIndex}`);
    queryParams.push(numericPrice);
    paramIndex++;
  }
  if (description !== undefined) {
    updateFields.push(`description = $${paramIndex}`);
    queryParams.push(description);
    paramIndex++;
  }
  if (status !== undefined) {
    if (typeof status !== "boolean") {
      return res.status(400).send({
        success: false,
        message: "Status must be a boolean value (true/false).",
      });
    }
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
  queryParams.push(dishId);

  try {
    const existingDishResult = await pool.query(
      `SELECT id FROM dishlist WHERE id = $1`,
      [dishId]
    );
    if (existingDishResult.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: `Dish with ID ${dishId} not found.`,
      });
    }

    const updateDishResult = await pool.query(
      `UPDATE dishlist SET ${updateFields.join(
        ", "
      )} WHERE id = $${finalIdParamIndex} RETURNING *`,
      queryParams
    );

    if (updateDishResult.rowCount === 0) {
      return res.status(200).send({
        success: false,
        message: "Dish data was already up to date, no changes made.",
      });
    }
    await pool.query(`DELETE FROM dishlist_images WHERE id_dishlist = $1`, [
      dishId,
    ]);
    const insertedImages = [];
    if (images.length > 0) {
      for (const img of images) {
        if (img.image) {
          const imageInsertResult = await pool.query(
            `INSERT INTO dishlist_images (id_dishlist, alt_text, image, create_at, update_at) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [dishId, img.alt_text || null, img.image, now, now]
          );
          insertedImages.push(imageInsertResult.rows[0]);
        }
      }
    }

    const updatedDish = updateDishResult.rows[0];
    return res.status(200).send({
      success: true,
      message: "Dishlist updated successfully.",
      data: {
        ...updatedDish,
        images: insertedImages,
      },
    });
  } catch (error) {
    console.error("Error updating dishlist:", error);

    if (error.code === "23505") {
      return res.status(409).send({
        success: false,
        message: "Update failed: A dish with this name/title already exists.",
      });
    } else if (error.code === "23503") {
      return res.status(400).send({
        success: false,
        message: "Invalid category_id provided. Category does not exist.",
      });
    } else if (error.code === "23502") {
      return res.status(400).send({
        success: false,
        message: `Missing required data or null value provided for a NOT NULL column: ${
          error.detail || error.message
        }.`,
      });
    }

    return res.status(500).send({
      success: false,
      message: "Error updating dishlist.",
      error: error.message,
    });
  }
};

export const deleteDishlistId = async (req, res) => {
  const removeDishlistId = req.params.id;

  if (!removeDishlistId) {
    return res.status(400).send({
      success: false,
      message: "Dish ID is required for deletion.",
    });
  }

  try {
    const checkDishResult = await pool.query(
      `SELECT id FROM dishlist WHERE id = $1`,
      [removeDishlistId]
    );
    if (checkDishResult.rowCount === 0) {
      return res.status(404).send({
        success: false,
        message: `Dish with ID ${removeDishlistId} not found.`,
      });
    }
    const deleteResult = await pool.query(
      `DELETE FROM dishlist WHERE id = $1 RETURNING id`,
      [removeDishlistId]
    );

    if (deleteResult.rowCount === 0) {
      return res.status(404).send({
        success: false,
        message: `Dish with ID ${removeDishlistId} not found or could not be deleted.`,
      });
    }

    res.status(200).send({
      success: true,
      message: "Dishlist deleted successfully.",
      data: {
        id: removeDishlistId,
      },
    });
  } catch (error) {
    console.error("Error deleting dishlist:", error);
    if (error.code === "23503") {
      return res.status(409).send({
        success: false,
        message:
          "Cannot delete dish: It is referenced by other records (e.g., in order items).",
        error: error.message,
      });
    }

    return res.status(500).send({
      success: false,
      message: "Error deleting dishlist.",
      error: error.message,
    });
  }
};

export default {
  getDishlistAll,
  getDishlistId,
  createDishlist,
  updateDishlistId,
  deleteDishlistId,
};
