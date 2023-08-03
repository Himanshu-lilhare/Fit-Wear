import express from "express"
import { deleteProducts } from "../controller/admin"

const adminRouter = express.Router()


adminRouter.route('/deleteProducts').delete(deleteProducts)

export default adminRouter