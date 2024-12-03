import pool from "../database/connexion.js";


const customerAll = async (req, res) => {
  try {
    const data = await pool.query(`SELECT * FROM customer`);
    if (!data) {
      return res.status(404).send({
        success: false,
        message: "404 not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "success Customer All",
      data: data[0],
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error",
    });
  }
};
const customerId = async (req, res) => {
  try {
    const orderId = req.params.id;
    if (!orderId) {
      return res.status(404).send({
        success: false,
        message: "",
      });
    }
    const [data] = await pool.query(
      `
    SELECT * FROM customer WHERE id = ?`,
      [orderId]
    );
    if (!data) {
      return res.status(403).send({
        success: false,
        message: "403 Invalid Customer",
      });
    }
    res.status(200).send({
      success: true,
      message: "success detail Customer",
      data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error , Please connect Customer",
    });
  }
};
const createCustomer = async(req,res) => {
   try {
     const { address , name , telephone } = req.body;
     if(!address || !name || !telephone) {
      return res.status(404).send({
        success: false,
        message: "403 NOT FOUND"
      })
     }
     const data = await pool.query(`
     INSERT INTO customer 
     (address, name,telephone)
     VALUES(?,?,?)
     `,[address,name,telephone]);
     if(!data) {
      return res.status(404).send({
        success: false,
        message: "404 Error client"
      })
     }
     res.status(200).send({
      success: true,
      message: "success Create Customer"
     })
   } catch(error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error 500",
    });
  }
}
const updateCustomerId = async (req, res) => {
  try {
    const updateCustomer = req.params.id;
    if (!updateCustomer) {
      return res.status(403).send({
        success: false,
        message: "403 not found",
      });
    }
    const { address,name,telephone } = req.body;
    const data = await pool.query(
      `
        UPDATE customer SET
        address = ? ,
        name = ?,
        telephone =?
         WHERE id = ?
        `,
      [ address, name, telephone , updateCustomer]
    );
    if (!data) {
      return res.status(404).send({
        success: false,
        message: "404 not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "success update customer",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error , Please connect customer",
    });
  }
};
const deleteCustomerId = async (req, res) => {
  try {
    const deleteCustomerId = req.params.id;
    if (!deleteCustomerId) {
      return res.status(404).send({
        success: false,
        message: "404 not found",
      });
    }
    await pool.query(
      `
    DELETE FROM customer
    WHERE id = ?`,
      [deleteCustomerId]
    );
    res.status(200).send({
      success: true,
      message: "success delete Customer",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error Customer",
    });
  }
};

export default {
  customerAll,
  customerId,
  createCustomer,
  updateCustomerId,
  deleteCustomerId
}