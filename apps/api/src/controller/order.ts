import { NextFunction, Request, Response } from "express";
import { tryCatchWrapper } from "../middleware/tryCatchWrapper";
import { CustomRequest } from "../middleware/Authenticae";
import { CustomError } from "../middleware/custumErrorClass";
import { instance } from "..";
import { orderModel } from "../model/order";


export const Checkout = tryCatchWrapper(async(req:CustomRequest,res:Response,next:NextFunction)=>{

 
        let user = req.user
        
        if (!user) next(new CustomError("you are not logged in", 400));
        const body = req?.body;
        console.log(body.cartTotal);
        let options = {
          amount: Math.ceil(body.cartTotal) * 100,
          currency: "INR",
        };
        console.log("order create karne bhi aaya");
        console.log( user && user._id)
        let data = await instance.orders.create(options)
       
        
        //   async(err, data) => {
        //   if (err) {
        //     return console.log("error aayyi");
        //   }
       
          let dataToBeInsert = {
            orderId: data.id,
            userId: user && user._id,
            address: body?.address,
            orderItems: body?.cartItems.map((item:any)=>{return {
              _id: item?.oneProduct,
              qty:item?.qty
            }}),
            paymentInfo: {
              id: "qwe", // for now we give random id , after payment verify we will give real id
    
              amountPaid: Math.ceil(body.cartTotal),
            },
          };
          
          let createdOrderInDb = await orderModel.create(dataToBeInsert);
          
          res.status(200).json({
            order: data,
          });
        
     

      


})