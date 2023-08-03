import express from "express"
import { createproduct, getAllProducts } from "../controller/product"

const productRouter = express.Router()

productRouter.route('/createProduct').post(createproduct)
productRouter.route('/getProducts').get(getAllProducts)

export default productRouter