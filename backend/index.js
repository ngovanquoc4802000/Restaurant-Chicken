import dotenv from "dotenv";
dotenv.config(); 
import express from "express";
import morgan from "morgan";
import "colors"; 

import pool from "./database/connectdatabase.js";
import routerUser from "./router/user.js";
import cors from "cors";
import routerCategoryApi from "./router/category.js";
import routerDishlist from "./router/dishList.js";
import routerOrder from "./router/order.js";
import routerImport from "./router/import.js"; 
import cookieParser from "cookie-parser";

const app = express();

// PORT
const PORT = process.env.APP_PORT || 7777;

// Middleware
app.use(cookieParser()); 
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(morgan("dev")); 

// --- Cấu hình CORS ---
// Lấy URL frontend từ biến môi trường và đảm bảo không có dấu / ở cuối
const APP_FE_URL = (process.env.APP_FE || "http://localhost:5173").replace(/\/$/, ''); 

const corsOptions = {
  origin: APP_FE_URL, // Cho phép truy cập từ origin của frontend
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Các phương thức HTTP được phép
  credentials: true, // Cho phép gửi cookies
  optionsSuccessStatus: 204, // Một số trình duyệt cũ (IE11, various SmartTVs) mắc kẹt ở 200
};
app.use(cors(corsOptions)); // Sử dụng middleware CORS

app.use("/category", routerCategoryApi);
app.use("/dishlist", routerDishlist);
app.use("/user", routerUser);
app.use("/order", routerOrder);
app.use("/import", routerImport);

app.get("/", (req, res) => {
  res.status(200).send("<h1> Đã thành công Kết nối PostgreSQL</h1>");
});

pool.query("SELECT 1")
  .then(() => {
    console.log(`kết nối database PostgreSQL thành công`.cyan.bold); 

    app.listen(PORT, () => {
      console.log(
        `Server running on port: http://localhost:${PORT}`.magenta.bold
      );
      console.log(`Frontend URL configured: ${APP_FE_URL}`.blue);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error.message.red.bold); 
    console.error("Server not started due to DB error.".red.bold);
  });

app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.stack.red); 
  res.status(500).send('Something broke!');
});
