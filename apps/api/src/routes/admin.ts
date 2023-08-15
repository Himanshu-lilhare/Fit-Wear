import express from "express"
import { createproduct, deleteProducts } from "../controller/admin"
import { AuthenticateUser } from "../middleware/Authenticae"
import { singleupload } from "../middleware/multer"

const adminRouter = express.Router()


adminRouter.route('/createProduct').post(AuthenticateUser,singleupload,createproduct)
adminRouter.route('/deleteProducts').delete(AuthenticateUser,deleteProducts)

export default adminRouter