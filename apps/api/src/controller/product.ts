import { NextFunction, Request, Response } from "express";
import { tryCatchWrapper } from "../middleware/tryCatchWrapper.js";
import { CustomError } from "../middleware/custumErrorClass";
import { product } from "../model/product";
import {createProductBody} from "common"
// import { CustomErrorHandler } from "../middleware/customerrorHandler.js";
export const createproduct = tryCatchWrapper(async(req:Request,res:Response,next:NextFunction)=>{

const isValid = createProductBody.safeParse(req.body)
 
if(!isValid.success){
  
  return next(new CustomError(isValid.error.errors[0].message.toString(),400))
}

  console.log("creaproduct karne aaya");
  const productData = req.body;

  // const fileUrl = getdataurl(req?.file).content;
  // const myCloudImage = await cloudinary.v2.uploader.upload(fileUrl!);
  // console.log(myCloudImage);

  // const image = {
  //   public_id: myCloudImage.public_id,
  //   url: myCloudImage.secure_url,
  // };
  // const productToBeCreate = { ...productData, images: [image] };

  const createdProduct = await product.create(productData);
  console.log(createdProduct + "   product create ho gaya");
  res.status(200).json(createdProduct);
})