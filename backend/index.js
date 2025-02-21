import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import morgan from "morgan";
import {} from "colors";
import pool from "./database/connexion.js";
import routerUser from "./router/user.js";
import cors from "cors";
/* routerCategory có image nên chỉ file */
import routerCategoryApi from "./controllers/categoryControllers.js";

import routerDishlist from './router/dishList.js';
import routerOrder from "./router/order.js";
import routerCustomer from "./router/customer.js";

//rest object
const app = express();

//configure dotenv
dotenv.config();

//PORT
const PORT = process.env.PORT || 7777;

//middlewares
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.static("uploads/category"));
app.use(express.static("uploads/dishlist"));
app.use(bodyParser.json());
app.use(express.json());
app.use(morgan("dev"));
app.use("/category", routerCategoryApi);
app.use("/dishlist",routerDishlist)
app.use("/user", routerUser);
app.use("/order", routerOrder);
app.use("/customer", routerCustomer);

/* app.use("/order", routerOrderDetails); */
//router
app.get("/", (req, res) => {
  res.status(200).send("<h1>Xin chào Node Js</h1>");
});

//conditional listen
pool
  .query("SELECT 1")
  .then(() => {
    console.log(`kết nối database thành công`.bgBlack.white);

    //listen
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
