import mongoose, { Schema } from "mongoose";
import User from "./user.interface";

const userSchema = new Schema({
  fname: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["user", "admin"],
  },
  lname: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const userModel = mongoose.model<User & mongoose.Document>("User", userSchema);

export default userModel;
