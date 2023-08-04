
import { Router } from "express"
import { addToCart, deleteFromCart, registerUser } from "../controller/user"

const userRouter = Router()

userRouter.route('/register').post(registerUser)
userRouter.route('/addToCart').post(addToCart)
userRouter.route('/deleteFromcart').delete(deleteFromCart)



export default userRouter