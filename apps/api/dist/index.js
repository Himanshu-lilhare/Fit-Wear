"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  instance: () => instance
});
module.exports = __toCommonJS(src_exports);
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
  console.log(err + " yaha aagaya yaara ye to");
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
var getAllProducts = tryCatchWrapper(async (req, res, next) => {
  let products = await product.find({});
  res.status(200).json({ products });
});
var getSingleProduct = tryCatchWrapper(async (req, res, next) => {
  let products = await product.findById(req.params.id);
  if (!products)
    return next(new CustomError("Product Doesnt Exist", 400));
  res.status(200).json({ product: products });
});

// src/routes/product.ts
var productRouter = import_express.default.Router();
productRouter.route("/getProducts").get(getAllProducts);
productRouter.route("/product/:id").get(getSingleProduct);
var product_default = productRouter;

// src/routes/admin.ts
var import_express2 = __toESM(require("express"));

// src/controller/admin.ts
var import_common = require("common");
var import_mongoose3 = __toESM(require("mongoose"));

// src/middleware/dataUri.ts
var import_parser = __toESM(require("datauri/parser.js"));
var import_path = __toESM(require("path"));
var getdatauri = (file) => {
  const parser = new import_parser.default();
  const extname = import_path.default.extname(file.originalname);
  return parser.format(extname, file.buffer);
};
var dataUri_default = getdatauri;

// src/controller/admin.ts
var import_cloudinary = __toESM(require("cloudinary"));
var createproduct = tryCatchWrapper(
  async (req, res, next) => {
    var _a2, _b2;
    req.body.price = parseInt((_a2 = req.body) == null ? void 0 : _a2.price);
    req.body.stock = parseInt((_b2 = req.body) == null ? void 0 : _b2.stock);
    const isValid = import_common.createProductBody.safeParse(req.body);
    if (!isValid.success) {
      return next(
        new CustomError(isValid.error.errors[0].message.toString(), 400)
      );
    }
    const productData = req.body;
    const fileUris = [];
    for (let file of req.files) {
      fileUris.push(dataUri_default(file));
    }
    let uploadedImages = [];
    for (let uri of fileUris) {
      const myCloudImage = await import_cloudinary.default.v2.uploader.upload(uri.content);
      uploadedImages.unshift({ url: myCloudImage.secure_url, public_id: myCloudImage.public_id });
    }
    const productToBeCreate = { ...productData, images: uploadedImages };
    const createdProduct = await product.create(productToBeCreate);
    console.log(createdProduct + "   product create ho gaya");
    res.status(200).json({ createdProduct });
  }
);
var deleteProducts = tryCatchWrapper(
  async (req, res, next) => {
    var _a2, _b2;
    if (!((_a2 = req.body) == null ? void 0 : _a2.deleteProducts))
      return next(
        new CustomError("Please Provide Which Product You Want to Delete", 400)
      );
    const objectIds = (_b2 = req.body) == null ? void 0 : _b2.deleteProducts.map(
      (product2) => new import_mongoose3.default.Types.ObjectId(product2)
    );
    console.log(objectIds);
    const isValid = import_common.deleteProductBody.safeParse(objectIds);
    if (!isValid.success)
      return next(new CustomError(isValid.error.errors[0].message, 400));
    const deleted = await product.deleteMany({ _id: { $in: objectIds } });
    res.status(201).json({ message: "Products Deleted" });
  }
);

// src/middleware/Authenticae.ts
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));

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
      minlength: 6
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

// src/middleware/Authenticae.ts
var AuthenticateUser = tryCatchWrapper(
  async (req, res, next) => {
    let tokenFromReq;
    if (req.cookies.fit_wear_token) {
      tokenFromReq = req.cookies.fit_wear_token;
    } else {
      console.log("else me hai");
      tokenFromReq = req.headers.authorization;
    }
    if (!tokenFromReq)
      return next(new CustomError("You Are Not LoggedIn", 400));
    let decoded = import_jsonwebtoken.default.verify(tokenFromReq, process.env.SECRET_KEY);
    let user = await userModel.findById({ _id: decoded._id });
    if (!user)
      return next(new CustomError("You are Providning Wrong Token", 400));
    req.user = user;
    console.log("aaya yaha pe");
    next();
  }
);

// src/middleware/multer.ts
var import_multer = __toESM(require("multer"));
var storage = import_multer.default.memoryStorage();
var singleupload = (0, import_multer.default)({ storage }).any();

// src/routes/admin.ts
var adminRouter = import_express2.default.Router();
adminRouter.route("/createProduct").post(AuthenticateUser, singleupload, createproduct);
adminRouter.route("/deleteProducts").delete(AuthenticateUser, deleteProducts);
var admin_default = adminRouter;

// src/routes/user.ts
var import_express3 = require("express");

// src/controller/user.ts
var import_common2 = require("common");
var import_mongoose5 = __toESM(require("mongoose"));
var import_bcrypt2 = __toESM(require("bcrypt"));
var import_jsonwebtoken2 = __toESM(require("jsonwebtoken"));
var import_cookie = require("cookie");
var registerUser = tryCatchWrapper(
  async (req, res, next) => {
    const isValid = import_common2.registerUserBody.safeParse(req.body);
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
var loginUser = tryCatchWrapper(
  async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password)
      return next(new CustomError("Please Provide Credentials", 400));
    let user = await userModel.findOne({ email }).lean();
    if (!user)
      return next(new CustomError("Please Provide Right Credentials", 400));
    let isCorrectPassword = import_bcrypt2.default.compare(password, user.password);
    if (!isCorrectPassword)
      return next(new CustomError("Please Provide Right Creedentials", 400));
    let token = generateJwtToken(user._id.toString(), process.env.SECRET_KEY);
    if (!token)
      return next(new CustomError("Some Prolbem To make Token", 400));
    const { password: pass, ...userWithoutPassword } = user;
    res.setHeader(
      "Set-Cookie",
      (0, import_cookie.serialize)("fit_wear_token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1e3)
      })
    );
    res.status(200).json({
      message: "loggedin Successfully",
      user
    });
  }
);
var logoutUser = tryCatchWrapper(
  async (req, res, next) => {
    res.status(200).clearCookie("fit_wear_token").json({
      message: "LoggedOut Successfully"
    });
  }
);
var addToCart = tryCatchWrapper(
  async (req, res, next) => {
    var _a2, _b2, _c;
    console.log(req.body.productId, req.body.qty + " ye hi body");
    const isValid = import_common2.addToCartBody.safeParse(req.body);
    if (!isValid.success)
      return next(new CustomError(isValid.error.errors[0].message, 400));
    let user = await userModel.findOne({
      _id: new import_mongoose5.default.Types.ObjectId((_a2 = req.user) == null ? void 0 : _a2._id),
      cart: {
        $elemMatch: {
          oneProduct: new import_mongoose5.default.Types.ObjectId(req.body.productId)
        }
      }
    }).populate("cart.oneProduct");
    let isProduct = await product.findOne({ _id: req.body.productId });
    if (!isProduct)
      return next(new CustomError("Product doesnt exist", 400));
    if (!user) {
      let addedTOCart = await userModel.updateOne(
        { _id: new import_mongoose5.default.Types.ObjectId((_b2 = req.user) == null ? void 0 : _b2._id) },
        {
          $push: {
            cart: {
              oneProduct: new import_mongoose5.default.Types.ObjectId(req.body.productId),
              qty: req.body.qty
            }
          }
        }
      );
      if (addedTOCart.modifiedCount === 1) {
        let user2 = await userModel.findById((_c = req.user) == null ? void 0 : _c._id).populate("cart.oneProduct");
        return res.status(200).json({ message: "Added To Cart", userCart: user2.cart });
      }
    } else {
      console.log(user.cart);
      const cartItemIndex = user.cart.findIndex(
        (item) => item.oneProduct._id.toString() === req.body.productId.toString()
      );
      if (cartItemIndex === -1) {
        return next(new CustomError("Product not found in cart.", 404));
      }
      user.cart[cartItemIndex].qty = req.body.qty;
      await user.save();
      return res.status(200).json({ message: "Updated Cart", userCart: user.cart });
    }
  }
);
var deleteFromCart = tryCatchWrapper(
  async (req, res, next) => {
    var _a2;
    console.log(req.query.productId);
    const { productId } = req.query;
    if (!productId || !((_a2 = req.user) == null ? void 0 : _a2._id))
      return res.send("kuch bhi mat kar");
    let user = await userModel.findOneAndUpdate(
      {
        _id: req.user._id,
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
var getUserCart = tryCatchWrapper(
  async (req, res, next) => {
    let user = req.user;
    console.log(user + " it is a user");
    if (!user)
      return next(new CustomError("You are Not LoggedIn", 400));
    user = await userModel.findById(user._id).populate("cart.oneProduct");
    let userCart = user == null ? void 0 : user.cart;
    res.status(200).json({
      userCart
    });
  }
);
var getUser = tryCatchWrapper(
  async (req, res, next) => {
    const user = req.user;
    if (!user)
      next(new CustomError("You ARe Not LoggedIn", 400));
    res.status(200).json({
      user
    });
  }
);
function generateJwtToken(userId, secret_key) {
  const token = import_jsonwebtoken2.default.sign({ _id: userId }, secret_key, {
    expiresIn: "24h"
  });
  return token;
}

// src/routes/user.ts
var userRouter = (0, import_express3.Router)();
userRouter.route("/register").post(registerUser);
userRouter.route("/addToCart").post(AuthenticateUser, addToCart);
userRouter.route("/deleteFromcart").delete(AuthenticateUser, deleteFromCart);
userRouter.route("/getUser").get(AuthenticateUser, getUser);
userRouter.route("/getCartItems").get(AuthenticateUser, getUserCart);
userRouter.route("/login").post(loginUser);
userRouter.route("/logout").delete(AuthenticateUser, logoutUser);
var user_default = userRouter;

// src/index.ts
var import_cookie_parser = __toESM(require("cookie-parser"));
var import_cloudinary2 = __toESM(require("cloudinary"));
var import_razorpay = __toESM(require("razorpay"));
import_dotenv.default.config({
  path: "./src/config/.env"
});
var app = (0, import_express4.default)();
app.disable("x-powered-by");
app.use((0, import_morgan.default)("dev"));
app.use(
  import_express4.default.urlencoded({
    extended: true
  })
);
app.use((0, import_body_parser.json)());
app.use((0, import_cors.default)({ origin: "http://localhost:3000", credentials: true }));
app.use((0, import_cookie_parser.default)());
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
import_cloudinary2.default.v2.config({
  cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
  api_key: process.env.CLOUDINARY_APIKEY,
  api_secret: process.env.CLOUDINARY_APISECRET
});
var instance = new import_razorpay.default({
  key_id: process.env.RAZORPAY_KEYID,
  key_secret: process.env.RAZORPAY_KEYSECRET
});
app.listen(process.env.PORT, () => console.log(`running at port ${process.env.PORT}`));
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  instance
});
