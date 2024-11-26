
const orderTableAll = async (req, res) => {
  try {
    const data = await pool.query(`SELECT * FROM order`);
    if (!data) {
      return res.status(404).send({
        success: false,
        message: "404 not found ",
      });
    }
    res.status(200).send({
      success: true,
      message: "success orderDetails All",
      data: data[0]
    });
     res.json({message: "hiển thị tất cả sản phẩm order"})
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error orderTableAll",
    });
  }
};
const oderTableId = async (req, res) => {
  try {
     res.json({message: "hiển thị chi tiết sản phẩm order"})
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error , Please connect disList",
    });
  }
};
const createOrderTable = async (req, res) => {
  try {
   res.json({success: "tạo order thành công"})
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error orderTable",
    });
  }
};
const updateOrderTable = async (req, res) => {
  try {
     res.json({ message: "update order thành công"})
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error , Please connect disList",
    });
  }
};
const deleteOrderTable = async (req, res) => {
  try {
    res.json({message: "delete thành công"})
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error orderTable",
    });
  }
};

export default {
  orderTableAll,
  oderTableId,
  createOrderTable,
  updateOrderTable,
  deleteOrderTable,
};
