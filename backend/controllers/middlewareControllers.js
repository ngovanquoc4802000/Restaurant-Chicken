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

const protect = (req, res, next) => {
  const isHeaderAuth = req.headers.authorization;
  if (isHeaderAuth && isHeaderAuth.startsWith("Bearer")) {
    try {
        /* ví dụ bearer 1334343 sẽ lấy 1334343 */
      const token = isHeaderAuth.split(" ")[1]; /* lấy khoảng trắng và lấy đầu tiên */
      const decoded = jwt.verify(token, jwtKey);
      req.user = decoded;
      next(); /* tỏa hết tất cả điều kiện thì mới được đi tiếp */
    } catch (error) {
      console.log("Error authentication token:  " + error.message);
      if (error.name === "TokenExpiredError") {
        return res
          .status(401)
          .json({ success: false, message: "Token đã hết hạn." });
      }
      if (error.name === "JsonWebTokenError") {
        return res
          .status(401)
          .json({ success: false, message: "Token không hợp lệ." });
      }
      res
        .status(401)
        .json({
          success: false,
          message: "Không được phép truy cập, token không hợp lệ.",
        });
    }
  } else {
       res.status(401).json({ success: false, message: 'Không có token, ủy quyền bị từ chối.' });
  }
};

export default protect;