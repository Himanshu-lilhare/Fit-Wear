
import { Router } from "express"
import { addToCart, deleteFromCart, getUserCart, loginUser, registerUser } from "../controller/user"

const userRouter = Router()

userRouter.route('/register').post(registerUser)
userRouter.route('/addToCart').post(addToCart)
userRouter.route('/deleteFromcart').delete(deleteFromCart)
userRouter.route('/getCartItems').get(getUserCart)
userRouter.route('/login').post(loginUser)




export default userRouter