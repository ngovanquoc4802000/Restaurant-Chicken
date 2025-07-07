import pool from "../database/connectdatabase.js";


const formatDbTimestamp = () => {
  return new Date().toISOString();
};

export const getOrders = async (req, res) => {
  const connection = await pool.connect();
  try {
     const ordersResult = await pool.query(`
        SELECT id, user_id, address, customer_note, customer_name, customer_phone,
               total_price, status, paid, process, create_at, update_at
        FROM "order_table"
      `);
    if (ordersResult.rows.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No orders found.",
      });
    }

    const dataWithDetails = await Promise.all(
      ordersResult.rows.map(async (order) => {
        const detailsResult = await pool.query(
          `SELECT id_dishlist, quantity, price, note FROM order_details WHERE id_order = $1`,
          [order.id]
        );
        return { ...order, details: detailsResult.rows };
      })
    );

    res.status(200).send({
      success: true,
      message: "Successfully retrieved all orders.",
      data: dataWithDetails,
    });
  } catch (error) {
    console.error("Error in getOrders:", error);
    return res.status(500).send({
      success: false,
      message: "Error retrieving orders.",
      error: error.message,
    });
  } finally {
    connection.release();
  }
};

export const getOrderDetails = async (req, res) => {
  const orderId = req.params.id;

  try {
    const orderResult = await pool.query(
      `SELECT id AS id_order, user_id, address, customer_note, customer_name, customer_phone, total_price, status, paid, process, create_at, update_at
       FROM "order_table"
       WHERE id = $1`,
      [orderId]
    );

    if (orderResult.rows.length === 0) {
      return res.status(404).send({
        success: false,
        message: `Order with ID ${orderId} not found.`,
      });
    }

    const order = orderResult.rows[0];

    const detailsResult = await pool.query(
      `SELECT id_dishlist, quantity, price, note
       FROM order_details
       WHERE id_order = $1`,
      [orderId]
    );

    const response = {
      id: order.id_order,
      user_id: order.user_id,
      address: order.address,
      customer_note: order.customer_note,
      customer_name: order.customer_name,
      customer_phone: order.customer_phone,
      total_price: parseFloat(order.total_price),
      status: order.status,
      paid: order.paid,
      process: order.process,
      create_at: order.create_at,
      update_at: order.update_at,
      details: detailsResult.rows.map((detail) => ({
        id_dishlist: detail.id_dishlist,
        quantity: detail.quantity,
        price: parseFloat(detail.price),
        note: detail.note,
      })),
    };

    res.status(200).send({
      success: true,
      data: response,
    });
  } catch (error) {
    console.error("Error in getOrderDetails:", error);
    res.status(500).send({
      success: false,
      message: "Error retrieving order details.",
      error: error.message,
    });
  }
};

export const createOrder = async (req, res) => {
  const {
    user_id,
    address,
    customer_note,
    customer_name,
    customer_phone,
    list_order,
  } = req.body;

  if (
    !user_id ||
    !address ||
    !customer_name ||
    !customer_phone ||
    !list_order ||
    !Array.isArray(list_order) ||
    list_order.length === 0
  ) {
    return res.status(400).send({
      success: false,
      message:
        "Invalid input data: Missing required fields or empty order list.",
    });
  }

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // Calculate total price
    const totalPrice = list_order.reduce((total, item) => {
      const price = parseFloat(item.price);
      const quantity = parseInt(item.quantity, 10);
      if (isNaN(price) || isNaN(quantity) || quantity < 0) {
        console.warn(
          `Invalid price (${item.price}) or quantity (${item.quantity}) for a list_order item. Skipping this item.`
        );
        return total;
      }
      return total + price * quantity;
    }, 0);

    const now = formatDbTimestamp();

    const orderInsertResult = await client.query(
      `INSERT INTO "order_table" (user_id, address, customer_note, customer_name, customer_phone, total_price, status, paid, process, create_at, update_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
       RETURNING id`,
      [
        user_id,
        address,
        customer_note,
        customer_name,
        customer_phone,
        totalPrice,
        false,
        false,
        "Xử lý",
        now,
        now,
      ]
    );

    const orderId = orderInsertResult.rows[0].id;

    for (const item of list_order) {
      const { id_dishlist, quantity, price, note } = item;

      if (
        isNaN(parseInt(id_dishlist, 10)) ||
        isNaN(parseInt(quantity, 10)) ||
        isNaN(parseFloat(price))
      ) {
        throw new Error(
          `Invalid data for order detail item: ${JSON.stringify(
            item
          )}. id_dishlist, quantity, or price is not a valid number.`
        );
      }

      await client.query(
        `INSERT INTO order_details (quantity, price, note, id_dishlist, id_order, create_at, update_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [quantity, price, note || null, id_dishlist, orderId, now, now] // Use null for empty notes if column allows
      );
    }

    await client.query("COMMIT");

    res.status(201).send({
      success: true,
      message: "Order created successfully.",
      orderId,
    });
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error in createOrder:", error);
    if (error.code === "23503") {
      return res.status(400).send({
        success: false,
        message: `Invalid foreign key provided. Check user_id or dishlist_id.`,
        error: error.message,
      });
    } else if (error.code === "23502") {
      return res.status(400).send({
        success: false,
        message: `Missing required data: ${error.column} cannot be null.`,
        error: error.message,
      });
    }
    res.status(500).send({
      success: false,
      message: "Error creating order.",
      error: error.message,
    });
  } finally {
    client.release();
  }
};

export const updateOrder = async (req, res) => {
  const {
    address,
    customer_note,
    customer_name,
    customer_phone,
    status,
    paid,
    process,
    list_order,
  } = req.body;
  const id = req.params.id;

  if (!list_order || !Array.isArray(list_order) || list_order.length === 0) {
    return res.status(400).send({
      success: false,
      message:
        "Invalid input data: 'list_order' is required and must be a non-empty array.",
    });
  }

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const orderCheck = await client.query(
      `SELECT id FROM "order_table" WHERE id = $1`,
      [id]
    );
    if (orderCheck.rows.length === 0) {
      await client.query("ROLLBACK");
      return res.status(404).send({
        success: false,
        message: `Order with ID ${id} not found.`,
      });
    }

    const newTotalPrice = list_order.reduce((total, item) => {
      const price = parseFloat(item.price);
      const quantity = parseInt(item.quantity, 10);
      if (isNaN(price) || isNaN(quantity) || quantity < 0) {
        console.warn(
          `Invalid price (${item.price}) or quantity (${item.quantity}) for a list_order item during update.`
        );
        return total; // Skip invalid item
      }
      return total + price * quantity;
    }, 0);

    const now = formatDbTimestamp();

    let updateFields = [];
    let queryParams = [];
    let paramIndex = 1;

    updateFields.push(`update_at = $${paramIndex}`);
    queryParams.push(now);
    paramIndex++;

    if (address !== undefined) {
      updateFields.push(`address = $${paramIndex}`);
      queryParams.push(address);
      paramIndex++;
    }
    if (customer_note !== undefined) {
      updateFields.push(`customer_note = $${paramIndex}`);
      queryParams.push(customer_note);
      paramIndex++;
    }
    if (customer_name !== undefined) {
      updateFields.push(`customer_name = $${paramIndex}`);
      queryParams.push(customer_name);
      paramIndex++;
    }
    if (customer_phone !== undefined) {
      updateFields.push(`customer_phone = $${paramIndex}`);
      queryParams.push(customer_phone);
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
    if (paid !== undefined) {
      if (typeof paid !== "boolean") {
        return res.status(400).send({
          success: false,
          message: "Paid must be a boolean value (true/false).",
        });
      }
      updateFields.push(`paid = $${paramIndex}`);
      queryParams.push(paid);
      paramIndex++;
    }
    if (process !== undefined) {
      updateFields.push(`process = $${paramIndex}`);
      queryParams.push(process);
      paramIndex++;
    }

    updateFields.push(`total_price = $${paramIndex}`);
    queryParams.push(newTotalPrice);
    paramIndex++;

    const orderIdParamIndex = paramIndex;
    queryParams.push(id);

    const updateOrderResult = await client.query(
      `UPDATE "order_table" SET ${updateFields.join(
        ", "
      )} WHERE id = $${orderIdParamIndex}`,
      queryParams
    );

    await client.query(`DELETE FROM order_details WHERE id_order = $1`, [id]);

    const validOrderDetails = list_order.filter((detail) => {
      const quantity = parseInt(detail.quantity, 10);
      const price = parseFloat(detail.price);
      return !isNaN(quantity) && quantity > 0 && !isNaN(price) && price >= 0;
    });

    if (validOrderDetails.length === 0) {
      throw new Error(
        "No valid order details provided. Please ensure quantity > 0 and price >= 0 for all items."
      );
    }

    const detailInsertQueries = validOrderDetails.map((detail) => {
      return client.query(
        `INSERT INTO order_details (id_order, id_dishlist, quantity, price, note, create_at, update_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [
          id,
          detail.id_dishlist,
          detail.quantity,
          detail.price,
          detail.note || null,
          now,
          now,
        ]
      );
    });

    await Promise.all(detailInsertQueries);

    await client.query("COMMIT");

    res.status(200).send({
      success: true,
      message: "Order updated successfully.",
    });
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error in updateOrder:", error);
    if (error.code === "23503") {
      return res.status(400).send({
        success: false,
        message: `Invalid dishlist_id provided in order details. Dish does not exist.`,
        error: error.message,
      });
    } else if (error.code === "23502") {
      return res.status(400).send({
        success: false,
        message: `Missing required data or null value provided for a NOT NULL column in order or details: ${
          error.detail || error.message
        }.`,
        error: error.message,
      });
    }
    res.status(500).send({
      success: false,
      message: "Error updating order.",
      error: error.message,
    });
  } finally {
    client.release();
  }
};

export const updateOrderProcess = async (req, res) => {
  const orderId = req.params.id;
  const steps = ["Processing", "Pending", "In Progress", "Completed"];
  const now = formatDbTimestamp();

  try {
    // --- SỬA ĐỔI Ở ĐÂY: Gán kết quả truy vấn vào orderResult ---
    const orderResult = await pool.query(
      `SELECT process FROM "order_table" WHERE id = $1`,
      [orderId]
    );

    if (orderResult.rows.length === 0) {
      return res
        .status(404)
        .send({ success: false, message: "Order not found." });
    }

    const currentProcess = orderResult.rows[0].process;
    const currentIndex = steps.findIndex((step) => step === currentProcess);
    const nextStep = steps[currentIndex + 1];

    if (!nextStep) {
      return res
        .status(400)
        .send({
          success: false,
          message: "Order already completed or invalid current process.",
        });
    }

    const updateResult = await pool.query(
      `UPDATE order_table SET process = $1, update_at = $2 WHERE id = $3`,
      [nextStep, now, orderId]
    );

    if (updateResult.rowCount === 0) {
      return res
        .status(500)
        .send({ success: false, message: "Failed to update order process." });
    }

    res
      .status(200)
      .send({ success: true, message: "Order process updated.", nextStep });
  } catch (error) {
    console.error("Error in updateOrderProcess:", error);
    res
      .status(500)
      .send({ success: false, message: "Server error.", error: error.message });
  }
};

export const deleteOrder = async (req, res) => {
  const deleteOrderId = req.params.id;

  if (!deleteOrderId) {
    return res.status(400).send({
      success: false,
      message: "Order ID is required for deletion.",
    });
  }

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    await client.query(`DELETE FROM order_details WHERE id_order = $1`, [
      deleteOrderId,
    ]);

    const deleteResult = await client.query(
      `DELETE FROM "order_table" WHERE id = $1`,
      [deleteOrderId]
    );

    if (deleteResult.rowCount === 0) {
      await client.query("ROLLBACK");
      return res.status(404).send({
        success: false,
        message: `Order with ID ${deleteOrderId} not found.`,
      });
    }

    await client.query("COMMIT");

    res.status(200).send({
      success: true,
      message: `Order with ID ${deleteOrderId} deleted successfully.`,
    });
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error in deleteOrder:", error);
    res.status(500).send({
      success: false,
      message: "Error deleting order.",
      error: error.message,
    });
  } finally {
    client.release();
  }
};

export default {
  getOrders,
  getOrderDetails,
  createOrder,
  updateOrderProcess,
  updateOrder,
  deleteOrder,
};
