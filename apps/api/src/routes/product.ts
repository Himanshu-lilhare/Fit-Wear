import express from "express"
import { getAllProducts, getSingleProduct } from "../controller/product"
import { AuthenticateUser } from "../middleware/Authenticae"

const productRouter = express.Router()


productRouter.route('/getProducts').get(getAllProducts)
productRouter.route('/product/:id').get(getSingleProduct)

export default productRouter