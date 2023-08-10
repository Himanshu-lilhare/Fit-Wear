import { NextFunction, Request, Response } from "express";
import { tryCatchWrapper } from "./tryCatchWrapper";
import jwt from "jsonwebtoken";
import { CustomError } from "./custumErrorClass";
import { userModel } from "../model/user";
import { UserDocument } from "common";

export interface CustomRequest extends Request{
  user?:UserDocument
}

export const AuthenticateUser = tryCatchWrapper(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    let tokenFromReq;
    if (req.cookies.fit_wear_token) {
      tokenFromReq = req.cookies.fit_wear_token;
    } else {
      console.log("else me hai");
      tokenFromReq = req.headers.authorization;
    } 

    if (!tokenFromReq)
      return next(new CustomError("You Are Not LoggedIn", 400));

    let decoded: any = jwt.verify(tokenFromReq, process.env.SECRET_KEY!);

    let user = await userModel.findById({ _id: decoded._id });
    if (!user)
      return next(new CustomError("You are Providning Wrong Token", 400));
    req.user = user 
    console.log("aaya yaha pe")
    next();
  }
);
