import pool from "../database/connexion.js";

const userAPIRegister = async(req,res) => {
   try {
      const { create_time , update_time, id , email , password ,address , telephone  } = req.body
      if( !create_time || !update_time || !id || !email || !password || !telephone ) {
        return res.status(403).send({
          success: false,
          message: "403 not found"
        })
      }
      const data = await pool.query(`
      INSERT INTO user_db(create_time, update_time , id , email , password , address , telephone)
      VALUES(? , ? , ? , ? , ? , ?, ?)
      `, [ create_time , update_time,id , email , password, address , telephone ])
      if(!data) {
        return res.status(404).send({
          success: false , 
          message: "404 is correct user"
        })
      }
      res.status(200).send({
        success: true ,
        message: "post user success"
      })
   } catch (error) {
    console.log(error);
    res.status(500).send({
        success: false,
        message : "Error 500"
    })
   }
}
export default { userAPIRegister };