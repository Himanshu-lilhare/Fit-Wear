import { NextFunction, Request, Response } from "express";

type CustumError = {
    statusCode :number,
    message:string
}

export function CustomErrorHandler(err:CustumError,req:Request,res:Response,next:NextFunction){

const statusCode = err.statusCode || 500
const message = err.message || "Some Internel Error"
console.log(err+ " yaha aagaya yaara ye to")
res.status(statusCode).json({
    error:message
})
}