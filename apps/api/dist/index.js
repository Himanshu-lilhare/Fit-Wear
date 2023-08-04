"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/index.ts
var import_express4 = __toESM(require("express"));
var import_body_parser = require("body-parser");
var import_morgan = __toESM(require("morgan"));
var import_cors = __toESM(require("cors"));
var import_dotenv = __toESM(require("dotenv"));

// src/config/connectDb.ts
var import_mongoose = __toESM(require("mongoose"));
async function connectDb() {
  try {
    console.log("connectdb me a gaya");
    const { connection } = await import_mongoose.default.connect("mongodb+srv://rajlilhare200:ZpdfoCcRrl8QFhLO@cluster0.yy4j67p.mongodb.net/?retryWrites=true&w=majority");
    console.log(`server is connect with ${connection.port}`);
  } catch (error) {
    console.log("connect nahi hua");
  }
}

// src/middleware/customerrorHandler.ts
function CustomErrorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Some Internel Error";
  res.status(statusCode).json({
    error: message
  });
}

// src/routes/product.ts
var import_express = __toESM(require("express"));

// src/middleware/custumErrorClass.ts
var CustomError = class extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
};

// src/middleware/tryCatchWrapper.ts
var tryCatchWrapper = (callbackFunc) => {
  return async (req, res, next) => {
    try {
      await callbackFunc(req, res, next);
    } catch (error) {
      console.log("ayaha aaya");
      next(new CustomError(error == null ? void 0 : error.message, 400));
    }
  };
};

// src/model/product.ts
var import_mongoose2 = __toESM(require("mongoose"));
var productSchema = new import_mongoose2.default.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  images: [
    {
      public_id: String,
      url: String
    }
  ],
  category: {
    type: String,
    required: [true, "Please enter Category"],
    enums: {
      value: ["t-shirts", "jeans"],
      message: "Please select Correct category"
    }
  },
  seller: {
    type: String,
    required: true
  },
  stock: {
    type: Number,
    required: true
  },
  ratings: {
    type: Number,
    default: 0
  },
  reviews: [{
    comment: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now()
    }
  }]
});
var product = import_mongoose2.default.models.product || import_mongoose2.default.model("product", productSchema);

// src/controller/product.ts
var import_common = require("common");
var createproduct = tryCatchWrapper(async (req, res, next) => {
  const isValid = import_common.createProductBody.safeParse(req.body);
  if (!isValid.success) {
    return next(new CustomError(isValid.error.errors[0].message.toString(), 400));
  }
  console.log("creaproduct karne aaya");
  const productData = req.body;
  const createdProduct = await product.create(productData);
  console.log(createdProduct + "   product create ho gaya");
  res.status(200).json(createdProduct);
});
var getAllProducts = tryCatchWrapper(async (req, res, next) => {
  let products = await product.find({});
  res.status(200).json({ products });
});

// src/routes/product.ts
var productRouter = import_express.default.Router();
productRouter.route("/createProduct").post(createproduct);
productRouter.route("/getProducts").get(getAllProducts);
var product_default = productRouter;

// src/routes/admin.ts
var import_express2 = __toESM(require("express"));

// src/controller/admin.ts
var import_common2 = require("common");
var import_mongoose3 = __toESM(require("mongoose"));
var deleteProducts = tryCatchWrapper(async (req, res, next) => {
  var _a2, _b2;
  if (!((_a2 = req.body) == null ? void 0 : _a2.deleteProducts))
    return next(new CustomError("Please Provide Which Product You Want to Delete", 400));
  const objectIds = (_b2 = req.body) == null ? void 0 : _b2.deleteProducts.map((product2) => new import_mongoose3.default.Types.ObjectId(product2));
  console.log(objectIds);
  const isValid = import_common2.deleteProductBody.safeParse(objectIds);
  if (!isValid.success)
    return next(new CustomError(isValid.error.errors[0].message, 400));
  const deleted = await product.deleteMany({ _id: { $in: objectIds } });
  res.status(201).json({ message: "Products Deleted" });
});

// src/routes/admin.ts
var adminRouter = import_express2.default.Router();
adminRouter.route("/deleteProducts").delete(deleteProducts);
var admin_default = adminRouter;

// src/routes/user.ts
var import_express3 = require("express");

// src/controller/user.ts
var import_common3 = require("common");

// src/model/user.ts
var import_mongoose4 = __toESM(require("mongoose"));
var import_bcrypt = __toESM(require("bcrypt"));
var userSchema = new import_mongoose4.default.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false
    },
    avatar: {
      public_id: String,
      url: String
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"]
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
          default: Date.now()
        }
      }
    ],
    cart: [
      {
        oneProduct: {
          type: import_mongoose4.default.Schema.Types.ObjectId,
          ref: "product"
        },
        qty: {
          type: Number,
          default: 1
        }
      }
    ],
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: String
  },
  { timestamps: true }
);
userSchema.pre("save", async function(next) {
  console.log("aaya");
  if (!this.isModified("password")) {
    next();
  }
  this.password = await import_bcrypt.default.hash(this.password, 10);
  next();
});
var _a, _b;
var userModel = ((_b = (_a = import_mongoose4.default) == null ? void 0 : _a.models) == null ? void 0 : _b.user) || import_mongoose4.default.model("user", userSchema);

// src/controller/user.ts
var import_mongoose5 = __toESM(require("mongoose"));
var registerUser = tryCatchWrapper(
  async (req, res, next) => {
    const isValid = import_common3.registerUserBody.safeParse(req.body);
    if (!isValid.success)
      return next(new CustomError(isValid.error.errors[0].message, 400));
    const { email, name, password } = req.body;
    let user = await userModel.findOne({ email: req.body.email });
    if (user)
      return res.status(401).send({ message: "user already exists" });
    let newUser = await userModel.create({ email, password, name });
    res.send({ user: newUser, message: "user created successfully" });
  }
);
var addToCart = tryCatchWrapper(
  async (req, res, next) => {
    const isValid = import_common3.addToCartBody.safeParse(req.body);
    if (!isValid.success)
      return next(new CustomError(isValid.error.errors[0].message, 400));
    let user = await userModel.findOne({
      _id: new import_mongoose5.default.Types.ObjectId(req.body.userId),
      cart: {
        $elemMatch: {
          oneProduct: new import_mongoose5.default.Types.ObjectId(req.body.productId)
        }
      }
    });
    let isProduct = await product.findOne({ _id: req.body.productId });
    if (!isProduct)
      return next(new CustomError("Product doesnt exist", 400));
    if (!user) {
      let addedTOCart = await userModel.updateOne(
        { _id: new import_mongoose5.default.Types.ObjectId(req.body.userId) },
        {
          $push: {
            cart: {
              oneProduct: new import_mongoose5.default.Types.ObjectId(req.body.productId),
              qty: req.body.qty
            }
          }
        }
      );
      if (addedTOCart.modifiedCount === 1)
        return res.status(200).json({ message: "Added To Cart" });
    } else {
      let user2 = await userModel.findOne({ _id: req.body.userId });
      if (!user2) {
        return next(new CustomError("User not found.", 404));
      }
      const cartItemIndex = user2.cart.findIndex((item) => item.oneProduct.toString() === req.body.productId.toString());
      if (cartItemIndex === -1) {
        return next(new CustomError("Product not found in cart.", 404));
      }
      user2.cart[cartItemIndex].qty = req.body.qty;
      let updatedUser = await user2.save();
      res.status(200).json({
        message: "Quantity updated successfully",
        user: updatedUser
      });
      if (!updatedUser) {
        return next(new CustomError("User not found or product not in cart.", 400));
      }
      res.status(200).json({
        message: "Quantity updated successfully",
        user: updatedUser
      });
    }
  }
);
var deleteFromCart = tryCatchWrapper(
  async (req, res, next) => {
    const isValid = import_common3.deleteFromCartBody.safeParse(req.body);
    const { productId, userId } = req.body;
    if (!productId || !userId)
      return res.send("kuch bhi mat kar");
    let user = await userModel.findOneAndUpdate(
      {
        _id: userId,
        cart: {
          $elemMatch: {
            oneProduct: productId
          }
        }
      },
      {
        $pull: {
          cart: {
            oneProduct: productId
          }
        }
      },
      {
        returnOriginal: false
      }
    );
    if (!user)
      return next(
        new CustomError("Probablly You Didnt Provide Right Data", 400)
      );
    res.status(200).json({
      message: "Deleted Successfully",
      user
    });
  }
);
var getUserCart = tryCatchWrapper(async (req, res, next) => {
  const { userId } = req.body;
  if (!userId)
    return next(new CustomError("You are Not LoggedIn", 400));
  let user = await userModel.findById(userId).populate("cart.oneProduct");
  let userCart = user == null ? void 0 : user.cart;
  res.status(200).json({
    userCart
  });
});

// src/routes/user.ts
var userRouter = (0, import_express3.Router)();
userRouter.route("/register").post(registerUser);
userRouter.route("/addToCart").post(addToCart);
userRouter.route("/deleteFromcart").delete(deleteFromCart);
userRouter.route("/getCartItems").get(getUserCart);
var user_default = userRouter;

// src/index.ts
import_dotenv.default.config({
  path: "./src/config/.env"
});
var app = (0, import_express4.default)();
app.disable("x-powered-by");
app.use((0, import_morgan.default)("dev"));
app.use((0, import_body_parser.urlencoded)({ extended: true }));
app.use((0, import_body_parser.json)());
app.use((0, import_cors.default)());
app.use(product_default);
app.use(user_default);
app.use(admin_default);
app.get("/message/:name", (req, res) => {
  return res.json({ message: `hello ${req.params.name}` });
});
app.get("/healthz", (req, res) => {
  return res.json({ ok: true });
});
app.use(CustomErrorHandler);
connectDb();
app.listen(process.env.PORT, () => console.log(`running at port ${process.env.PORT}`));
