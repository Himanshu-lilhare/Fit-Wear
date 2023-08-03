import express from "express";
import { json, urlencoded } from "body-parser";
import morgan from "morgan";
import cors from "cors";
import dotenv from 'dotenv'
import {connectDb} from "./config/connectDb.js"
import { CustomErrorHandler } from "./middleware/customerrorHandler.js";
import productRouter from "./routes/product.js";
dotenv.config({
  path: "./src/config/.env",
});
const app = express();

app.disable("x-powered-by");

app.use(morgan("dev"));
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(cors());
app.use(productRouter)
app.get("/message/:name", (req, res) => {
  return res.json({ message: `hello ${req.params.name}` });
});
app.get("/healthz", (req, res) => {
  return res.json({ ok: true });
});
app.use(CustomErrorHandler)
connectDb()

app.listen(process.env.PORT,()=>console.log(`running at port ${process.env.PORT}`))
