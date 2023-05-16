import { Request, Response, Router } from "express";

//models
import orderModel from "./order.model";
import SeatModel from "../seat/seat.model";

// interfaces
import Controller from "../../interfaces/controller.interface";

class orderController implements Controller {
  public path = "orders";
  public seat = SeatModel;
  public router = Router();
  public order = orderModel;

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes = () => {
    this.router.get(`/:id`, this.getOrder);
    this.router.post(`/serve`, this.serveOrder);
    this.router.get(`/all/:id`, this.getAllOrders);
  };

  private getOrder = async (req: Request, res: Response) => {
    const id = req.params.id;

    try {
      const result = await this.order.findById(id);
      return res.status(200).json({ result });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  };

  private getAllOrders = async (req: Request, res: Response) => {
    const id = req.params.id;

    try {
      const result = await this.order.find({ restaurant: id });
      return res.status(200).json({ result });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  };

  private serveOrder = async (req: Request, res: Response) => {
    const id = req.body.id;

    try {
      const order = await this.order.findByIdAndUpdate(id, {
        status: "delivered",
      });
      const seat = await this.seat.findByIdAndUpdate(order?.seat, {
        served: true,
      });
      return res.status(200).json({ order, seat });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  };
}

export default orderController;
