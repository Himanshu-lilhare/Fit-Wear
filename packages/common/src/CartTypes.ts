import { Schema } from "mongoose";
import { ProductType } from "./ProductTypes";

export interface Cart {
    oneProduct: string;
    qty?: number;
    _id:string
  }
  export interface CartItems {
    oneProduct: ProductType;
    qty?: number;
    _id:string
  }