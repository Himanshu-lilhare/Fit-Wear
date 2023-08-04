
import { Router } from "express"
import { addToCart, deleteFromCart, getUserCart, registerUser } from "../controller/user"

const userRouter = Router()

userRouter.route('/register').post(registerUser)
userRouter.route('/addToCart').post(addToCart)
userRouter.route('/deleteFromcart').delete(deleteFromCart)
userRouter.route('/getCartItems').get(getUserCart)



export default userRouter