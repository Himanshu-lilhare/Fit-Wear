import { NextFunction, Request, Response } from "express"
import { tryCatchWrapper } from "./tryCatchWrapper"
import jwt from 'jsonwebtoken'
import { CustomError } from "./custumErrorClass"
import { userModel } from "../model/user"

export const AuthenticateUser = tryCatchWrapper(async(req:Request,res:Response,next:NextFunction)=>{
console.log('yaha aaya')
let tokenFromReq = req.cookies.fit_wear_token || req.headers.authorization?.split("Bearer")[1]
console.log(tokenFromReq)
if(!tokenFromReq) return next(new CustomError("You Are Not LoggedIn",400))

let decoded:any = jwt.verify(tokenFromReq,process.env.SECRET_KEY!)

let user = await userModel.findById({_id:decoded._id}) 
if(!user) return next(new CustomError("You are Providning Wrong Token",400))
req.headers['user'] = user

next()

})

