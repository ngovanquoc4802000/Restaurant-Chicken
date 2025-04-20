import pool from "../database/connectdatabase.js";

const getCatetoryAll = async (req, res) => {
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
      error: error.message // Include error detail for debugging
    });
  }
};

const getCategoryId = async (req, res) => {
  try {
    const categoryId = req.params.id;

    if (!categoryId) {
      // Use 400 for bad request if ID is missing in params
      return res.status(400).send({
        success: false,
        message: "Category ID is required",
      });
    }

    // SELECT * will include the 'status' column
    const [data] = await pool.query(
      `
      SELECT * FROM category WHERE id = ?
      `,
      [categoryId]
    );

    // Check if any row was returned
    if (!data || data.length === 0) {
      return res.status(404).send({
        success: false,
        message: `Category with ID ${categoryId} not found`, // More specific message
      });
    }

    res.status(200).send({
      success: true,
      message: "Successfully retrieved category by ID", // More descriptive message
      data: data[0], // Send the first row found
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error retrieving category by ID", // More descriptive message
      error: error.message // Include error detail for debugging
    });
  }
};

// Create a new category
const createCategory = async (req, res) => {
  try {
    // Destructure status from body, default to true if not provided
    const { name, handle, image, status = true } = req.body;

    if (!name || !handle) {
      return res.status(400).send({ // Use 400 for bad request
        success: false,
        message: "Name and handle are required fields",
      });
    }

    // Validate status if it was provided in the request body
    if (status !== undefined && typeof status !== 'boolean') {
         return res.status(400).send({
             success: false,
             message: "Status must be a boolean value (true/false)."
         });
    }

    // Convert boolean status to TINYINT(1) (1 for true, 0 for false) for MySQL
    const statusTinyInt = status ? 1 : 0;

    // Include 'status' in the INSERT query and parameters
    const [result] = await pool.query(
      `INSERT INTO category
      (name, handle , image , status)
      VALUES(?,?,?,?)`,
      [name, handle, image, statusTinyInt] // Pass the converted status
    );

    // Check if insertion was successful (e.g., check affectedRows or insertId)
    if (!result || result.affectedRows === 0) {
         return res.status(500).send({ // Use 500 if insertion failed unexpectedly
             success: false,
             message: "Failed to create category."
         });
    }

    const newCategoryId = result.insertId; // Use insertId property

    // Retrieve the newly created category to return it in the response
    const [newData] = await pool.query(`SELECT * FROM category WHERE id = ?`, [newCategoryId]);

    // Check if the new category was retrieved
    if (!newData || newData.length === 0) {
        // This case is less likely if insertion succeeded, but good for robustness
         return res.status(500).send({
             success: false,
             message: "Failed to retrieve newly created category."
         });
    }


    res.status(201).send({ // Use 201 for resource created
      success: true,
      message: "Category created successfully",
      data: newData[0], // Send the newly created category data
    });
  } catch (error) {
    console.log(error);
    // Check for specific database errors if possible (e.g., duplicate handle)
    if (error.code === 'ER_DUP_ENTRY') { // Example MySQL duplicate entry error code
        return res.status(409).send({ // Use 409 for conflict
            success: false,
            message: "Category with this handle already exists."
        });
    }
    res.status(500).send({
      success: false,
      message: "Error creating category", // More descriptive message
      error: error.message // Include error detail for debugging
    });
  }
};

// Pagination for categories
const categoryPagination = async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    // Basic validation for page and limit
    if (isNaN(page) || isNaN(limit) || page < 1 || limit < 1) {
         return res.status(400).send({
             success: false,
             message: "Invalid page or limit parameters. Must be positive integers."
         });
    }

    const offset = (page - 1) * limit;

    // SELECT * will include the 'status' column
    const [data] = await pool.query(
      `SELECT * FROM category LIMIT ? OFFSET ? `,
      [limit, offset] // Use limit and offset directly, they are numbers after parseInt
    );

    // Fix: Get total count from the 'category' table, not 'api_db'
    const [totalPageData] = await pool.query(
      `SELECT count(*) as count FROM category`
    );

    const totalItems = totalPageData[0]?.count || 0; // Handle case where count might be undefined
    const totalPage = Math.ceil(totalItems / limit);

    // Check if the requested page is out of bounds
    if (page > totalPage && totalPage > 0) { // Only check if there are items
        return res.status(404).send({
            success: false,
            message: `Page ${page} not found. Max available page is ${totalPage}.`
        });
    }


    res.status(200).send({
      success: true,
      message: "Categories pagination success",
      data: data,
      pagination: {
        page: page,
        limit: limit,
        totalItems: totalItems, // Include total items count
        totalPage: totalPage,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error fetching paginated categories", // More descriptive message
      error: error.message // Include error detail for debugging
    });
  }
};

// Update a category by ID
const updateCategoryId = async (req, res) => {
  try {
    const categoryId = req.params.id; // Renamed for clarity
    const { name, handle, image , status } = req.body;

    if (!categoryId) {
      return res.status(400).send({ // Use 400 for bad request
        success: false,
        message: "Category ID is required for update",
      });
    }

    // Validate status if it was provided in the request body
    if (status !== undefined && typeof status !== 'boolean') {
         return res.status(400).send({
             success: false,
             message: "Status must be a boolean value (true/false)."
         });
    }

     // Convert boolean status to TINYINT(1) (1 for true, 0 for false) for MySQL
    const statusTinyInt = status !== undefined ? (status ? 1 : 0) : undefined; // Only convert if status was provided

    // Build the update query dynamically based on provided fields
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
     if (statusTinyInt !== undefined) { // Use the converted status value
        updateFields.push("status = ?");
        queryParams.push(statusTinyInt);
    }

    // If no fields are provided to update
    if (updateFields.length === 0) {
         return res.status(400).send({
             success: false,
             message: "No fields provided for update."
         });
    }

    const updateQuery = `UPDATE category SET ${updateFields.join(', ')} WHERE id = ?`;
    queryParams.push(categoryId); // Add ID to the parameters

    const [result] = await pool.query(updateQuery, queryParams);

    // Check if any row was affected (category found and updated)
    if (!result || result.affectedRows === 0) {
         // Could be 404 if ID doesn't exist, or 304 if data is the same
         // Let's check if the category existed first for a better message
         const [existingCategory] = await pool.query(`SELECT id FROM category WHERE id = ?`, [categoryId]);

         if (existingCategory.length === 0) {
              return res.status(404).send({
                 success: false,
                 message: `Category with ID ${categoryId} not found.`
              });
         } else {
              // Category exists but no rows affected (data was the same)
               return res.status(200).send({ // Still return 200 but indicate no change
                 success: false, // Indicate no change happened technically
                 message: "Category data was already up to date, no changes made.",
               });
         }
    }

    // Optionally, fetch the updated category data to return
    const [updatedCategoryData] = await pool.query(`SELECT * FROM category WHERE id = ?`, [categoryId]);


    res.status(200).send({
      success: true,
      message: "Category updated successfully", // More descriptive message
      data: updatedCategoryData[0] // Return updated data
    });
  } catch (error) {
    console.log(error);
     // Check for specific database errors (e.g., duplicate handle)
    if (error.code === 'ER_DUP_ENTRY') {
        return res.status(409).send({
            success: false,
            message: "Update failed: Category with this handle already exists."
        });
    }
    return res.status(500).send({
      success: false,
      message: "Error updating category", // More descriptive message
      error: error.message // Include error detail for debugging
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
      // Category not found to delete
      return res.status(404).send({
        success: false,
        message: `Category with ID ${removeCategory} not found.`,
      });
    }

    res.status(200).send({
      success: true,
      message: "Category deleted successfully", // More descriptive message
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error deleting category", // More descriptive message
      error: error.message // Include error detail for debugging
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