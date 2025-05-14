import pool from "../database/connectdatabase.js";

export const getDishlistAll = async (req, res) => {
  try {
    const [data] = await pool.query(`SELECT * FROM dishlist`);
    if (!data) {
      return res.status(404).send({
        success: false,
        message: "404 not found",
      });
    }
    const dataWithImages = await Promise.all(
      data.map(async (item) => {
        const [images] = await pool.query(
          `SELECT * FROM dishlist_images WHERE id_dishlist = ?`,
          [item.id]
        );
        return { ...item, images };
      })
    );

    res.status(200).send({
      success: true,
      message: "get success api All",
      data: dataWithImages,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error",
    });
  }
};

export const getDishlistId = async (req, res) => {
  const categoryId = req.params.id;
  if (!categoryId) {
    return res.status(403).send({
      success: false,
      message: "Invalid , Please connect fields",
    });
  }
  try {
    const [data] = await pool.query(
      `
       SELECT * FROM dishlist WHERE id = ?
      `,
      [categoryId]
    );
    const dish = data[0];
    const [images] = await pool.query(
      `SELECT * FROM dishlist_images WHERE id_dishlist = ?`,
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
      message: "success dislistId",
      data: {
        ...dish,
        images,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error retrieving category id",
    });
  }
};

export const createDishlist = async (req, res) => {
  const {
    category_id,
    name,
    title,
    currency,
    price,
    description,
    images,
    status = true,
  } = req.body;

  if (!name || !title || !price) {
    return res.status(400).send({
      success: false,
      message: "Please provide name, title, and price",
    });
  }

  if (status !== undefined && typeof status !== "boolean") {
    return res.status(400).send({
      success: false,
      message: "Status must be a boolean value (true/false).",
    });
  }

  const statusTinyInt = status ? 1 : 0;
  const numericPrice = parseFloat(price);
  if (isNaN(numericPrice)) {
    return res.status(400).send({
      success: false,
      message: "Price must be a valid number",
    });
  }

  const now = new Date().toISOString().slice(0, 19).replace("T", " ");
  try {
    const [data] = await pool.query(
      `INSERT INTO dishlist 
      (category_id, name, title, currency, price, description, status, create_at, update_at) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        category_id,
        name,
        title,
        currency || "VND",
        numericPrice,
        description,
        statusTinyInt,
        now,
        now,
      ]
    );

    if (!data || data.affectedRows === 0) {
      return res.status(500).send({
        success: false,
        message: "Failed to create dishlist",
      });
    }

    const dishId = data.insertId;
    const insertImages = [];

    if (images && Array.isArray(images) && images.length > 0) {
      for (const image of images) {
        const { alt_text, image: imageUrl } = image;

        const [imageResult] = await pool.query(
          `INSERT INTO dishlist_images (id_dishlist, alt_text, image,create_at,update_at)
          VALUES (?, ?, ?,?,?)`,
          [dishId, alt_text, imageUrl, now, now]
        );

        if (imageResult) {
          insertImages.push({
            id: imageResult.insertId,
            id_dishlist: dishId,
            alt_text,
            image: imageUrl,
          });
        }
      }
    }

    const [newDishRows] = await pool.query(
      `SELECT * FROM dishlist WHERE id = ?`,
      [dishId]
    );

    res.status(201).send({
      success: true,
      message: "Dishlist created successfully",
      data: {
        ...newDishRows[0],
        images: insertImages,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error creating dishlist",
      error: error.message, // thêm để dễ debug
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

  // Bỏ kiểm tra !images vì [] hợp lệ
  if (!category_id || !name || !title || !price || !description) {
    return res.status(400).json({
      success: false,
      message:
        "Please provide category_id, name, title, price, and description",
    });
  }

  try {
    const [existingDish] = await pool.query(
      `SELECT * FROM dishlist WHERE id = ?`,
      [dishId]
    );
    if (existingDish.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Dish not found",
      });
    }

    const [data] = await pool.query(
      `UPDATE dishlist SET category_id = ?, name = ?, title = ?, currency = ?, price = ?, description = ?, status = ? WHERE id = ?`,
      [
        category_id,
        name,
        title,
        currency || "VND",
        price,
        description,
        status || 1,
        dishId,
      ]
    );

    if (data.affectedRows === 0) {
      return res.status(400).send({
        success: false,
        message: "Update failed or dishlist not modified",
      });
    }
    const now = new Date().toISOString().slice(0, 19).replace("T", " ");
    // Cập nhật ảnh
    await pool.query(`DELETE FROM dishlist_images WHERE id_dishlist = ?`, [
      dishId,
    ]);
    for (const img of images) {
      if (img.image) {
        await pool.query(
          `INSERT INTO dishlist_images (id_dishlist, alt_text, image , create_at, update_at) VALUES (?, ?, ?, ? , ?)`,
          [dishId, img.alt_text || "", img.image, now, now]
        );
      }
    }

    const [updateDish] = await pool.query(
      `SELECT * FROM dishlist WHERE id = ?`,
      [dishId]
    );
    const [updatedImages] = await pool.query(
      `SELECT * FROM dishlist_images WHERE id_dishlist = ?`,
      [dishId]
    );

    return res.status(200).send({
      success: true,
      message: "success api UpdateDishlist",
      data: {
        id: dishId,
        ...updateDish[0],
        images: updatedImages,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error Api dishlist",
    });
  }
};

export const deleteDishlistId = async (req, res) => {
  const removeDishlist = req.params.id;
  try {
    await pool.query(`SELECT FROM dishlist_images WHERE id_dishlist = ? `, [
      removeDishlist,
    ]);
    const [data] = await pool.query(`DELETE FROM dishlist WHERE id = ?`, [
      removeDishlist,
    ]);
    if (!data) {
      return res.status(404).send({
        success: false,
        message: "404 , Not found deleteDishlist",
      });
    }
    res.status(200).send({
      success: true,
      message: "Success delete Id Dishlist",
      data: {
        id: removeDishlist,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error deleteDishlist",
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
