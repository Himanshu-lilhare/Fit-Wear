import { NextFunction, Request, Response } from "express";
import { tryCatchWrapper } from "../middleware/tryCatchWrapper";
import { product } from "../model/product";
import { deleteProductBody } from "common";
import { CustomError } from "../middleware/custumErrorClass";
import mongoose from "mongoose";
export const deleteProducts = tryCatchWrapper(async(req:Request,res:Response,next:NextFunction)=>{
    if(!req.body?.deleteProducts) return next(new CustomError("Please Provide Which Product You Want to Delete",400))
    const objectIds = req.body?.deleteProducts.map((product:string)=> new mongoose.Types.ObjectId(product))
   console.log(objectIds)
    const isValid = deleteProductBody.safeParse(objectIds)

    if(!isValid.success) return next(new CustomError(isValid.error.errors[0].message,400))

    const deleted = await product.deleteMany({_id:{$in : objectIds}})

    res.status(201).json({message:"Products Deleted"})
})