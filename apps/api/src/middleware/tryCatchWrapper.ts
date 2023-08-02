import { NextFunction, Request, Response } from "express"


export const tryCatchWrapper = (callbackFunc:any)=>{

return async (req:Request,res:Response,next:NextFunction)=>{

    try {
        callbackFunc(req,res,next)

    } catch (error) {
        
        next()
    }

}

}