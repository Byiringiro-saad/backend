import { Request, Response, Router } from "express";

//models
import cartModel from "./cart.model";
import orderModel from "../order/order.model";

//interfaces
import Controller from "../../interfaces/controller.interface";

class cartController implements Controller {
  public path = "carts";
  public router = Router();
  public cart = cartModel;
  public order = orderModel;

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
      restaurant: req.body.restaurant,
    };

    try {
      const result = await new this.cart(data).save();
      return res.status(200).json({ result });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  };

  private checkout = async (req: Request, res: Response) => {
    const data = {
      status: "pending",
      user: req.body.user,
      seat: req.body.seat,
      price: req.body.price,
      products: [...req.body.cart],
      restaurant: req.body.restaurant,
    };

    try {
      const order = await new this.order(data).save();
      const result = await this.cart.deleteMany({
        user: req.body.user,
        restaurant: req.body.restaurant,
      });
      return res.status(200).json({ order, result });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  };

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
