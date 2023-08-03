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
var import_express2 = __toESM(require("express"));
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

// src/routes/product.ts
var productRouter = import_express.default.Router();
productRouter.route("/createProduct").post(createproduct);
var product_default = productRouter;

// src/index.ts
import_dotenv.default.config({
  path: "./src/config/.env"
});
var app = (0, import_express2.default)();
app.disable("x-powered-by");
app.use((0, import_morgan.default)("dev"));
app.use((0, import_body_parser.urlencoded)({ extended: true }));
app.use((0, import_body_parser.json)());
app.use((0, import_cors.default)());
app.use(product_default);
app.get("/message/:name", (req, res) => {
  return res.json({ message: `hello ${req.params.name}` });
});
app.get("/healthz", (req, res) => {
  return res.json({ ok: true });
});
app.use(CustomErrorHandler);
connectDb();
app.listen(process.env.PORT, () => console.log(`running at port ${process.env.PORT}`));
