import mongoose, { Schema } from "mongoose";
import User from "./user.interface";

const userSchema = new Schema({
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: false,
  },
  phone: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: false,
  },
});

const userModel = mongoose.model<User & mongoose.Document>("User", userSchema);

export default userModel;
