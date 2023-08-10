
import { Router } from "express"
import { addToCart, deleteFromCart, getUser, getUserCart, loginUser, logoutUser, registerUser } from "../controller/user"
import { AuthenticateUser } from "../middleware/Authenticae"

const userRouter = Router()

userRouter.route('/register').post(registerUser)
userRouter.route('/addToCart').post(addToCart)
userRouter.route('/deleteFromcart').delete(deleteFromCart)
userRouter.route('/getUser').get(AuthenticateUser,getUser)
userRouter.route('/getCartItems').get(AuthenticateUser,getUserCart)
userRouter.route('/login').post(loginUser)
userRouter.route('/logout').delete(AuthenticateUser,logoutUser)





export default userRouter