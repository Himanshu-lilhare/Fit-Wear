import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    
    },
    avatar: {
      public_id: String,
      url: String,
    },
    role: {
      type: String,

      default: "user",
      enum: ["user", "admin"],
    },
    address: [
      {
        street: String,
        city: String,
        state: String,
        phone: String,
        zipcode: String,
        country: String,
        createdAt: {
          type: Date,
          default: Date.now(),
        },
      },
    ],
    cart: [
      {
       oneProduct:{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
       },
        qty: {
          type: Number,
          default: 1,
        },
      },
    ],
    forgotPasswordToken:String,
    forgotPasswordExpiry:Date,
    verifyToken:String,
    verifyTokenExpiry:String
  },
  { timestamps: true }
);
userSchema.pre("save", async function (next) {
    console.log('aaya')
    if (!this.isModified("password")) {
      next();
    }

    this.password = await bcrypt.hash(this.password, 10);
    next();
  });

export const userModel = mongoose?.models?.user || mongoose.model("user", userSchema);
