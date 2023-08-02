import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    images: [
      {
        public_id: String,
        url: String,
      },
    ],
    category: {
      type: String,
      required: [true, "Please enter Category"],
      enums: {
        value: ["t-shirts", "jeans"],
        message: "Please select Correct category",
      },
    },
    seller: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    ratings:{
      type:Number,
      default:0
    },
    reviews:[{
      ratings:{
          type:Number,
          required:true
      },
      comment:{
          type:String,
          required:true
      },
      createdAt:{
          type:Date,
          default:Date.now()
      }
    }]
  });
  
  export const product=  mongoose.models.product||mongoose.model('product',productSchema)
  