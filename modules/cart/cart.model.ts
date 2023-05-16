import mongoose, { Document, Schema } from "mongoose";

//interfaces
import Cart from "./cart.interface";

const cartSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const cartModel = mongoose.model<Cart & Document>("Cart", cartSchema);

export default cartModel;
