import Joi from "joi";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//interfaces
import User from "./user.interface";

//models
import userModel from "./user.model";

class UserServices {
  private user = userModel;

  public validateSignup = async (data: User) => {
    const schema = Joi.object({
      fname: Joi.string().required(),
      role: Joi.string().required(),
      lname: Joi.string().required(),
      phone: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
    });

    return await schema.validateAsync(data);
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
}

export default UserServices;
