import { NextFunction, Request, Response } from "express";
import { tryCatchWrapper } from "../middleware/tryCatchWrapper";
import { product } from "../model/product";
import { Images, createProductBody, deleteProductBody } from "common";
import { CustomError } from "../middleware/custumErrorClass";
import mongoose from "mongoose";
import getdatauri from "../middleware/dataUri";
import cloudinary, { UploadApiResponse } from "cloudinary";



export const createproduct = tryCatchWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    req.body.price = parseInt(req.body?.price);
    req.body.stock = parseInt(req.body?.stock);
    const isValid = createProductBody.safeParse(req.body);

    if (!isValid.success) {
      return next(
        new CustomError(isValid.error.errors[0].message.toString(), 400)
      );
    }

    const productData = req.body;

    const fileUris = [];

    for (let file of req.files as Express.Multer.File[]) {
      fileUris.push(getdatauri(file));
    }




let uploadedImages : Images[] = []
   
for(let uri of fileUris){
  const myCloudImage: UploadApiResponse = await cloudinary.v2.uploader.upload(uri.content!);
  uploadedImages.unshift({url:myCloudImage.secure_url,public_id:myCloudImage.public_id}) 
}



    

    
    const productToBeCreate = { ...productData, images:uploadedImages };

    const createdProduct = await product.create(productToBeCreate);
    console.log(createdProduct + "   product create ho gaya");
    res.status(200).json({createdProduct});
  }
);

export const deleteProducts = tryCatchWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.body?.deleteProducts)
      return next(
        new CustomError("Please Provide Which Product You Want to Delete", 400)
      );
    const objectIds = req.body?.deleteProducts.map(
      (product: string) => new mongoose.Types.ObjectId(product)
    );
    console.log(objectIds);
    const isValid = deleteProductBody.safeParse(objectIds);

    if (!isValid.success)
      return next(new CustomError(isValid.error.errors[0].message, 400));

    const deleted = await product.deleteMany({ _id: { $in: objectIds } });

    res.status(201).json({ message: "Products Deleted" });
  }
);
