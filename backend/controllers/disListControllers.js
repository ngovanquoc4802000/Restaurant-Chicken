
export const getDishlist = async (req, res) => {
 
};

export const getDishlistId = async (req, res) => {
 
};

export const createDishlist = async (req, res) => {
 
};

export const updateDishlist = async (req, res) => {

  try {
   
  } catch (error) {
    await connection.rollback();
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error updating order",
    });
  } finally {
    connection.release();
  }
};

export const deleteDishlist = async (req, res) => {
  try {
   
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error orderTable",
    })
  } finally {
    connection.release()
  }
};
