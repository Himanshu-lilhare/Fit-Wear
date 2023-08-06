import { NextFunction, Request, Response } from "express"
import { tryCatchWrapper } from "./tryCatchWrapper"
import jwt from 'jsonwebtoken'
import { CustomError } from "./custumErrorClass"

export const AuthenticateUser = tryCatchWrapper((req:Request,res:Response,next:NextFunction)=>{
console.log('yaha aaya')
let tokenFromReq = req.cookies.fit_wear_token || req.headers.authorization?.split("Bearer")[1]
console.log(tokenFromReq)
if(!tokenFromReq) return next(new CustomError("You Are Not LoggedIn",400))

let decoded = jwt.verify(tokenFromReq,process.env.SECRET_KEY!)

console.log(decoded)

next()

})

