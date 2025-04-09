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
        )
        return {...item,images}
      })
    )
      
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
       SELECT * FROM dishlist WHERE id = ?
      `,
      [categoryId]
    );
     const dish = data[0];
     const [images] = await pool.query(
      `SELECT * FROM dishlist_images WHERE id_dishlist = ?`,
      [categoryId]
     )
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
        ...dish, images
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
  const { category_id, name, title, currency, price, description,images } = req.body;
  if (!name || !title || !price) {
    return res.status(400).send({
      success: false,
      message: "Please provide name, title, and price",
    });
  }
  try {
    const [data] = await pool.query(
      `INSERT INTO dishlist 
      (category_id, name, title,currency, price,description) 
      VALUES(?,?,?,?,?,?)`,
      [category_id, name, title, currency || "VND", price, description]
    );
    if (!data) {
      return res.status(404).send({
        success: false,
        message: "404 not found",
      });
    }
    const dishId = data.insertId;
      /* chèn bảng nếu images được cung cấp */
    const insertImages = [];
    if(images && Array.isArray(images) && images.length > 0) {
     
      for(const image of images) {
      
        const {alt_text,image: imageUrl} = image;

        const [imageResult] = await pool.query(
          `INSERT INTO dishlist_images (id_dishlist,alt_text,image)
          VALUES(?,?,?)
          `,
      
          [dishId,alt_text,imageUrl]
      
        );
        if(imageResult) {
          insertImages.push({
            id: imageResult.insertId,
            id_dishlist: dishId,
            alt_text,
            image: imageUrl
          })
        }
      }
    }
     // lấy món ăn mới được tạo ra
     const [newDish] = await pool.query(`SELECT * FROM dishlist WHERE id= ?`,[dishId]) 
    res.status(200).send({
      success: true,
      message: "success api ",
      data: {
        id: dishId,
        ...newDish,
        images: insertImages
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error creating dishlist",
    });
  }

};
export const updateDishlistId = async (req, res) => {
  const dishId = req.params.id;
  const { category_id, name, title, currency, price, description } = req.body;
  if (!name || !title || !price) {
    return res.status(400).json({
      success: false,
      message: "Please provide name, title, and price",
    });
  }
  try {
    const [data] = await pool.query(
      `
      UPDATE dishlist SET
      category_id = ?, name = ?, title = ?, currency = ?, price = ?, description = ? WHERE id = ?
      `,
      [category_id, name, title, currency || "VND", price, description, dishId]
    );
    /* lấy món ăn được cập nhật và hình ảnh cập nhật của nó */
    const [updateDish] = await pool.query(`SELECT * FROM dishlist WHERE id = ?`, [dishId]);
    const [images] = await pool.query(`SELECT * FROM dishlist_images WHERE id_dishlist = ?`,[dishId]);

    if (!data) {
      return res.status(404).send({
        success: false,
        message: "404 not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "success api UpdateDishlist",
      data : {
        id: dishId, 
        ...updateDish[0],
        images : images
      }
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
     await pool.query(`SELECT FROM dishlist_images WHERE id_dishlist = ? `,[removeDishlist])
    const [data] = await pool.query(`DELETE FROM dishlist WHERE id = ?`, [removeDishlist]);
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
        id: removeDishlist
      }
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
