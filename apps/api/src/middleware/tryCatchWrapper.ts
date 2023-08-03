import { NextFunction, Request, Response } from "express"
import { CustomError } from "./custumErrorClass"


export const tryCatchWrapper = (callbackFunc:any)=>{

return async (req:Request,res:Response,next:NextFunction)=>{

    try {
      
       await callbackFunc(req,res,next)

    }catch(error:any){
        console.log('ayaha aaya')
        next(new CustomError(error?.message,400))
    }

}

}