import { Request, Response, Router } from "express";

//interfaces
import Controller from "../../interfaces/controller.interface";

class RestaurantController implements Controller {
  public router = Router();
  public path = "restaurants";

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes = () => {
    this.router.get(`/:id`, this.getRestaurant);
    this.router.post(`/`, this.createRestaurant);
    this.router.get(`/`, this.getAllRestaurants);
  };

  private createRestaurant = async (req: Request, res: Response) => {};

  private getAllRestaurants = async (req: Request, res: Response) => {};

  private getRestaurant = async (req: Request, res: Response) => {};
}

export default RestaurantController;
