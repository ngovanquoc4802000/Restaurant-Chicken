import dotenv from "dotenv";
dotenv.config();
console.log(process.env.JWT_SECRET);
import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import {} from "colors";
import pool from "./database/connectdatabase.js";

import routerUser from "./router/user.js";
import cors from "cors";

import routerCategoryApi from "./router/category.js";
import routerDishlist from "./router/dishList.js";
import routerOrder from "./router/order.js";
import cookieParser from "cookie-parser";

const app = express();

//PORT
const PORT = process.env.PORT || 7777;
//middlewares
app.use(
  cors({
    origin: "http://localhost:5173", //cookie
    credentials: true
  })
);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.json());
app.use(morgan("dev"));

app.use("/category", routerCategoryApi);
app.use("/dishlist", routerDishlist);
app.use("/user", routerUser);
app.use("/order", routerOrder);

app.get("/", (req, res) => {
  res.status(200).send("<h1> Đã thành công Kết nối PostgreSQL</h1>");
});

pool.on("connect", () => {
  console.log("connect postgreSQL thành công");
});

pool
  .query("SELECT 1")
  .then(() => {
    console.log(`kết nối database PostgreSQL thành công`.bgBlack.white);

    app.listen(PORT, () => {
      console.log(
        `Server running on port: http://localhost:${process.env.PORT}`.bgMagenta
          .white
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });
