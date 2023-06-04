import { Request, Response, Router } from "express";

//models
import SeatModel from "./seat.model";

//interfaces
import Controller from "../../interfaces/controller.interface";

class SeatController implements Controller {
  public path = "seats";
  public seat = SeatModel;
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes = () => {
    this.router.post(`/`, this.createSeats);
    this.router.get(`/:id`, this.getSeat);
    this.router.post(`/book`, this.bookSeat);
    this.router.post(`/take`, this.takeSeat);
    this.router.get(`/all/:id`, this.getAllSeats);
  };

  private createSeats = async (req: Request, res: Response) => {
    const data = {
      seats: req.body.seats,
      status: "available",
      restaurant: req.body.restaurant,
    };

    const seats = data?.seats?.map((seat: any) => {
      return {
        name: seat,
        status: data?.status,
        restaurant: data?.restaurant,
      };
    });

    try {
      const result = await this.seat.insertMany(seats);
      return res.status(200).json({ result });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  };

  private getSeat = async (req: Request, res: Response) => {
    const id = req.params.id;

    try {
      const result = await this.seat.findById(id);
      return res.status(200).json({ result });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  };

  private getAllSeats = async (req: Request, res: Response) => {
    const id = req.params.id;

    try {
      const result = await this.seat.find({ restaurant: id });
      return res.status(200).json({ seats: result });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  };

  private bookSeat = async (req: Request, res: Response) => {
    const data = {
      status: "booked",
      seat: req.body.seat,
      booked_by: req.body.user,
    };

    try {
      const result = await this.seat.updateOne({ _id: data.seat }, data);
      return res.status(200).json({ result });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  };

  private takeSeat = async (req: Request, res: Response) => {
    const data = {
      status: "taken",
      seat: req.body.seat,
      taken_by: req.body.user,
    };

    try {
      const result = await this.seat.updateOne({ _id: data.seat }, data);
      return res.status(200).json({ result });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  };
}

export default SeatController;
