import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  orderId: {
   type:String
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required:true,
    ref: 'user',
  },
  address: {
    street: String,
    city: String,
    state: String,
    phone: String,
    zipcode: String,
    country: String,
  },
  orderItems: [
  {
    _id:{
type: mongoose.Schema.Types.ObjectId,
ref:'product'
    },
    qty:Number
  }
  ],
  paymentInfo: {
    id: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default:'pending'
    },
   
    amountPaid: {
      type: Number,
      required: true,
    },
  },
  orderStatus: {
    type: String,
    required: true,
    default: "processing",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export const orderModel =  mongoose.models.order||mongoose.model('order',orderSchema)