import { NextFunction, Request, Response } from "express";
import { tryCatchWrapper } from "../middleware/tryCatchWrapper";
import { CustomError } from "../middleware/custumErrorClass";


export const createproduct = tryCatchWrapper(async(req:Request,res:Response,next:NextFunction)=>{

  const name = req?.body?.name
  if(!name) next(new CustomError('Name nahi Dale APne',400))

})