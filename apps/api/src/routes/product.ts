import express from "express"
import { createproduct, getAllProducts } from "../controller/product"
import { AuthenticateUser } from "../middleware/Authenticae"

const productRouter = express.Router()

productRouter.route('/createProduct').post(createproduct)
productRouter.route('/getProducts').get(AuthenticateUser, getAllProducts)
export default productRouter