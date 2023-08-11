import { NextFunction, Request, Response } from "express";
import { tryCatchWrapper } from "../middleware/tryCatchWrapper";
import {
  registerUserBody,
  addToCartBody,
  deleteFromCartBody,
  ProductType,
} from "common";
import { CustomError } from "../middleware/custumErrorClass";
import { userModel } from "../model/user";
import mongoose from "mongoose";
import { product } from "../model/product";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserDocument } from "common";
import { serialize } from "cookie";
import { CustomRequest } from "../middleware/Authenticae";

export const registerUser = tryCatchWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const isValid = registerUserBody.safeParse(req.body);
    if (!isValid.success)
      return next(new CustomError(isValid.error.errors[0].message, 400));
    const { email, name, password } = req.body;
    let user = await userModel.findOne({ email: req.body.email });
    if (user) return res.status(401).send({ message: "user already exists" });

    let newUser = await userModel.create({ email, password, name });
    res.send({ user: newUser, message: "user created successfully" });
  }
);

export const loginUser = tryCatchWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    if (!email || !password)
      return next(new CustomError("Please Provide Credentials", 400));

    let user: UserDocument | null = await userModel.findOne({ email }).lean();
    if (!user)
      return next(new CustomError("Please Provide Right Credentials", 400));

    let isCorrectPassword = bcrypt.compare(password, user.password);
    if (!isCorrectPassword)
      return next(new CustomError("Please Provide Right Creedentials", 400));

    let token = generateJwtToken(user._id.toString(), process.env.SECRET_KEY!);
    if (!token) return next(new CustomError("Some Prolbem To make Token", 400));

    const { password: pass, ...userWithoutPassword } = user;

    res.setHeader(
      "Set-Cookie",
      serialize("fit_wear_token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      })
    );
    res.status(200).json({
      message: "loggedin Successfully",
      user,
    });
  }
);

export const logoutUser = tryCatchWrapper(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    res.status(200).clearCookie("fit_wear_token").json({
      message: "LoggedOut Successfully",
    });
  }
);

export const addToCart = tryCatchWrapper(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    console.log(req.body.productId, req.body.qty + " ye hi body");
    const isValid = addToCartBody.safeParse(req.body);

    if (!isValid.success)
      return next(new CustomError(isValid.error.errors[0].message, 400));

    let user = await userModel
      .findOne({
        _id: new mongoose.Types.ObjectId(req.user?._id),
        cart: {
          $elemMatch: {
            oneProduct: new mongoose.Types.ObjectId(req.body.productId),
          },
        },
      })
      .populate("cart.oneProduct");

    let isProduct = await product.findOne({ _id: req.body.productId });
    if (!isProduct) return next(new CustomError("Product doesnt exist", 400));

    if (!user) {
      let addedTOCart = await userModel.updateOne(
        { _id: new mongoose.Types.ObjectId(req.user?._id) },
        {
          $push: {
            cart: {
              oneProduct: new mongoose.Types.ObjectId(req.body.productId),
              qty: req.body.qty,
            },
          },
        }
      );
      if (addedTOCart.modifiedCount === 1){
        let user = await userModel
        .findById(req.user?._id)
        .populate("cart.oneProduct");
        return res
          .status(200)
          .json({ message: "Added To Cart", userCart: user.cart });
      } 
    } else {
      console.log(user.cart)
      const cartItemIndex: number = user.cart.findIndex(
        (item: any) => item.oneProduct._id.toString() === req.body.productId.toString()
      );

      if (cartItemIndex === -1) {
        return next(new CustomError("Product not found in cart.", 404));
      }

      user.cart[cartItemIndex].qty = req.body.qty;
      await user.save();
      return res
        .status(200)
        .json({ message: "Updated Cart", userCart: user.cart });
    }
  }
);

export const deleteFromCart = tryCatchWrapper(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    // const isValid = deleteFromCartBody.safeParse(req.body);
    console.log(req.query.productId);
    const { productId } = req.query;

    if (!productId || !req.user?._id) return res.send("kuch bhi mat kar");

    let user = await userModel.findOneAndUpdate(
      {
        _id: req.user._id,
        cart: {
          $elemMatch: {
            oneProduct: productId,
          },
        },
      },
      {
        $pull: {
          cart: {
            oneProduct: productId,
          },
        },
      },
      {
        returnOriginal: false,
      }
    );

    if (!user)
      return next(
        new CustomError("Probablly You Didnt Provide Right Data", 400)
      );

    res.status(200).json({
      message: "Deleted Successfully",
      user,
    });
  }
);

export const getUserCart = tryCatchWrapper(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    let user = req.user;
    console.log(user + " it is a user");
    if (!user) return next(new CustomError("You are Not LoggedIn", 400));

    user = await userModel.findById(user._id).populate("cart.oneProduct");
    let userCart = user?.cart;
    res.status(200).json({
      userCart,
    });
  }
);

export const getUser = tryCatchWrapper(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user) next(new CustomError("You ARe Not LoggedIn", 400));

    res.status(200).json({
      user,
    });
  }
);
function generateJwtToken(userId: string, secret_key: string): string {
  const token = jwt.sign({ _id: userId }, secret_key, {
    expiresIn: "24h",
  });
  return token;
}
