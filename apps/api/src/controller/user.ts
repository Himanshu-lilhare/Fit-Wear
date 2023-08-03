import { NextFunction, Request, Response } from "express";
import { tryCatchWrapper } from "../middleware/tryCatchWrapper";
import { registerUserBody } from "common";
import { CustomError } from "../middleware/custumErrorClass";
import { userModel } from "../model/user";
export const registerUser = tryCatchWrapper(async(req:Request,res:Response,next:NextFunction)=>{

   const isValid = registerUserBody.safeParse(req.body)
 if(!isValid.success) return next(new CustomError(isValid.error.errors[0].message,400))
const {email,name,password} = req.body
 let user = await userModel.findOne({ email:req.body.email });
    if (user) return res.status(401).send({ message: "user already exists" });
  
    let newUser = await userModel.create({ email, password, name });
    res.send({ user: newUser, message: "user created successfully" });

})