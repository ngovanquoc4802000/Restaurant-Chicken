import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import morgan from 'morgan';
import {} from 'colors'
import pool from './database/connexion.js';
import routerCategory from './router/category.js';
import routerDishList from './router/dishList.js'
import routerOrderDetails from './router/orderTable.js';
import routerUser from './router/user.js'
//rest object
const app = express();

//configure dotenv 
dotenv.config();

//PORT 
const PORT = process.env.PORT || 7777;

//middlewares
app.use(bodyParser.json());
app.use(express.json());
app.use(morgan("dev"));
app.use('/category', routerCategory);
app.use('/dishList', routerDishList);
app.use('/orderDetails',routerOrderDetails);
app.use('/user', routerUser)
//router
app.get('/',(req,res) => {
  res.status(200).send('<h1>Xin chào Node Js</h1>')
})

//conditional listen
pool.query('SELECT 1').then(() => {
   console.log(`kết nối database thành công`.bgBlack.white)
   
   //listen
   app.listen(PORT, () => {
     console.log(`Server running on port: http://localhost:${process.env.PORT}`.bgMagenta.white)
   })
}).catch((error) => {
  console.log(error)
})

