/* 
 1.lấy token từ header của request
 2.kiểm tra xem token có tồn tại không
 3.sử dụng jwt.verify() để xác minh token bằng JWT_SECRET của bạn
 4. nếu token hợp lệ , nó sẽ đính kèm thông tin người dùng từ token vào đói tượng req
 ví dụ: req.user và gọi next() để chuyển quyền kiểm soát sang middleware hoặc router handle
 5.nếu token không hợp lệ ví dụ: thiếu sai, hoặc hết hạn. nó sẽ trả về lỗi 401 hoặc 403 forbidden
*/
import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
const jwtKey = process.env.JWT_SECRET;

if (!jwtKey) {
  console.log("không định được biến môi trường .env");
  process.exit(1);
}

const verify = (req,res,next) => {
    const token = req.headers.token || req.headers.authorization;
    if (token) {
      const accessToken = token.split(" ")[1];
      jwt.verify(accessToken, jwtKey, (err, user) => {
        if (err) {
          res.status(401).json("Token is not valid");
        }
        req.user = user;
        next();
      });
    } else {
        res.status(403).json("You're not authenticated")
    }
};
export default verify