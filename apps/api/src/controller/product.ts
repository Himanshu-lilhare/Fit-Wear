import { NextFunction, Request, Response } from "express";
import { tryCatchWrapper } from "../middleware/tryCatchWrapper.js";

import { product } from "../model/product";
import { CustomError } from "../middleware/custumErrorClass.js";

// import { CustomErrorHandler } from "../middleware/customerrorHandler.js";

export const getAllProducts = tryCatchWrapper(async(req:Request,res:Response,next:NextFunction)=>{

let products = await product.find({})

res.status(200).json({products})

})
export const getSingleProduct = tryCatchWrapper(async(req:Request,res:Response,next:NextFunction)=>{
     
    let products = await product.findById(req.params.id)
    
    if(!products) return next(new CustomError("Product Doesnt Exist",400))


    res.status(200).json({product:products})
    
    })