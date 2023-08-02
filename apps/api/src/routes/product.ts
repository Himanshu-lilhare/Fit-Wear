import express from "express"
import { createproduct } from "../controller/product"

const productRouter = express.Router()

productRouter.route('/createProduct').post(createproduct)

export default productRouter