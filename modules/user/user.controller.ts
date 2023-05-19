import bcrypt from "bcryptjs";
import { Router, Request, Response } from "express";

//models
import userModel from "./user.model";

//services
import UserServices from "./user.service";

//interfaces
import Controller from "../../interfaces/controller.interface";

class UserController implements Controller {
  public path = "users";
  public user = userModel;
  public router = Router();
  public services = new UserServices();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes = () => {
    this.router.post(`/`, this.createUser);
    this.router.get(`/`, this.getAllUsers);
    this.router.post(`/login`, this.login);
  };

  private createUser = async (req: Request, res: Response) => {
    const data = {
      role: "user",
      fname: req.body.fname,
      lname: req.body.lname,
      phone: req.body.phone,
      email: req.body.email,
      password: req.body.password,
    };

    try {
      this.services
        .validateSignup(data)
        .then((result) => {
          this.services
            .createUser(result)
            .then(async (result) => {
              const token = await this.services.generateToken(result);
              return res.status(200).json({ token });
            })
            .catch((err) => {
              return res.status(400).json({ message: err.message });
            });
        })
        .catch((err) => {
          throw new Error(err.message);
        });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  };

  private login = async (req: Request, res: Response) => {
    const data = {
      email: req.body.email,
      password: req.body.password,
    };

    try {
      this.services
        .validateLogin(data)
        .then((result) => {
          this.user
            .findOne({ email: result.email })
            .then(async (result) => {
              if (result) {
                const isPasswordValid = await bcrypt.compare(
                  data.password,
                  result.password
                );
                if (isPasswordValid) {
                  const token = await this.services.generateToken(result);
                  const hasRestaurant = await this.services.hasRestaurant(
                    result._id
                  );
                  return res.status(200).json({ token, hasRestaurant });
                } else {
                  return res.status(400).json({ message: "Invalid password" });
                }
              } else {
                return res.status(400).json({ message: "user not found" });
              }
            })
            .catch((err) => {
              return res.status(400).json({ message: err.message });
            });
        })
        .catch((err) => {
          throw new Error(err.message);
        });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  };

  private getAllUsers = async (req: Request, res: Response) => {
    try {
      this.user
        .find({})
        .then((users) => {
          return res.status(200).json({
            users: users,
          });
        })
        .catch((err) => {
          throw new Error(err.message);
        });
    } catch (error: any) {
      return res.status(400).json({
        message: error.message,
      });
    }
  };
}

export default UserController;
