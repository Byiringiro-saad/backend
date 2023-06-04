import Joi from "joi";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//interfaces
import User from "./user.interface";

//models
import userModel from "./user.model";
import restaurantModel from "../restaurant/restaurant.model";

class UserServices {
  private user = userModel;
  private restaurant = restaurantModel;

  public validateSignup = async (data: User) => {
    const schema = Joi.object({
      role: Joi.string().required(),
      fname: Joi.string().required(),
      lname: Joi.string().required(),
      phone: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
    });

    const response = await schema.validateAsync(data);

    const user = await this.user.findOne({ email: response.email });

    if (user) {
      return new Error("User already exists");
    } else {
      return response;
    }
  };

  public validateLogin = async (data: { email: string; password: string }) => {
    const schema = Joi.object({
      email: Joi.string().required(),
      password: Joi.string().required(),
    });

    return await schema.validateAsync(data);
  };

  public createUser = async (data: User) => {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return await new this.user({
      role: data.role,
      fname: data.fname,
      lname: data.lname,
      phone: data.phone,
      email: data.email,
      password: hashedPassword,
    }).save();
  };

  public generateToken = async (data: User) => {
    const token = jwt.sign({ _id: data._id }, `${process.env.JWT_SECRET}`);
    return token;
  };

  public hasRestaurant = async (data: User) => {
    const owner = await this.restaurant.findOne({ owner_id: data._id });
    if (owner) {
      return owner;
    } else {
      return false;
    }
  };
}

export default UserServices;
