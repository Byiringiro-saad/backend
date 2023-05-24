import mongoose, { Document, Schema } from "mongoose";

//interfaces
import Product from "./product.interface";

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
  ingredients: {
    type: String,
    required: true,
  },
});

const productModel = mongoose.model<Product & Document>(
  "Product",
  productSchema
);

export default productModel;
