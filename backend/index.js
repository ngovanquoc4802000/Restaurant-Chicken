import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import bodyParser from 'body-parser';
//rest object
const app = express();

//configure dotenv 
dotenv.config();

//PORT 
const PORT = process.env.PORT || 7777;

//middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(bodyParser.json());

//router
app.get('/',(req,res) => {
  res.status(200).send('<h1>Xin chào Node Js</h1>')
})

//conditional listen

//listen
app.listen(PORT, () => {
  console.log("Kết nối database thành công")
})
