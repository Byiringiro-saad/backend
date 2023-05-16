import { Request, Response, Router } from "express";

//models
import cartModel from "./cart.model";

//interfaces
import Controller from "../../interfaces/controller.interface";

class cartController implements Controller {
  public path = "carts";
  public router = Router();
  public cart = cartModel;

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes = () => {
    this.router.get(`/:id`, this.getCart);
    this.router.post(`/add`, this.addToCart);
    this.router.post(`/checkout`, this.checkout);
    this.router.post(`/remove`, this.removeFromCart);
  };

  private getCart = async (req: Request, res: Response) => {
    const data = {
      user: req.params.id,
    };

    try {
      const result = await this.cart.find(data);
      return res.status(200).json({ result });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  };

  private addToCart = async (req: Request, res: Response) => {
    const data = {
      user: req.body.user,
      product: req.body.product,
      quantity: req.body.quantity,
    };

    try {
      const result = await new this.cart(data).save();
      return res.status(200).json({ result });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  };

  private checkout = async (req: Request, res: Response) => {};

  private removeFromCart = async (req: Request, res: Response) => {
    const data = {
      user: req.body.user,
      product: req.body.product,
    };

    try {
      const result = await this.cart.findOneAndDelete(data);
      return res.status(200).json({ result });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  };
}

export default cartController;
