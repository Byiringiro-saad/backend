import { Request, Response, Router } from "express";

//models
import restaurantModel from "./restaurant.model";

//interfaces
import Controller from "../../interfaces/controller.interface";

//middlewares
import authMiddleWare from "../../middlewares/auth";
import cloudinary from "../../middlewares/cloudinary";
import { multerUpload } from "../../middlewares/multer";

//services
import RestaurantServices from "./restaurant.service";

class RestaurantController implements Controller {
  public router = Router();
  public path = "restaurants";
  public restaurant = restaurantModel;
  public services = new RestaurantServices();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes = () => {
    this.router.get(`/:id`, this.getRestaurant);
    this.router.get(`/`, this.getAllRestaurants);
    this.router.post(`/search`, this.searchRestaurant);
    this.router.post(`/one`, authMiddleWare, this.createRestaurantOne);
    this.router.post(
      `/two`,
      authMiddleWare,
      multerUpload.single("file"),
      this.createRestaurantTwo
    );
  };

  private createRestaurantOne = async (req: Request, res: Response) => {
    const data = {
      name: req.body.name,
      owner_id: req.body.user,
      full_name: req.body.full_name,
      owner_name: req.body.owner_name,
      owner_email: req.body.owner_email,
      owner_phone: req.body.owner_phone,
      restaurant_phone: req.body.restaurant_phone,
    };

    try {
      this.services
        .createRestaurantOne(data)
        .then((result) => {
          return res.status(200).json({ result });
        })
        .catch((err) => {
          return res.status(400).json({ message: err.message });
        });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  };

  private createRestaurantTwo = async (req: Request, res: Response) => {
    const localFilePath = req.file?.path || "";

    const { imageURL } = await cloudinary.uploadImage(localFilePath);

    const data = {
      logo: imageURL,
      type: req.body.type,
      opening: req.body.opening,
      closing: req.body.closing,
      location: req.body.location,
      restaurant: req.body.restaurant,
    };

    try {
      this.services
        .createRestaurantTwo(data)
        .then((result) => {
          return res.status(200).json({ result });
        })
        .catch((err) => {
          return res.status(400).json({ message: err.message });
        });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  };

  private getAllRestaurants = async (req: Request, res: Response) => {
    try {
      this.restaurant
        .find({})
        .then((result) => {
          return res.status(200).json({ result });
        })
        .catch((err) => {
          return res.status(400).json({ message: err.message });
        });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  };

  private getRestaurant = async (req: Request, res: Response) => {
    const data = {
      _id: req.params.id,
    };

    try {
      this.restaurant
        .findOne(data)
        .then((result) => {
          return res.status(200).json({ result });
        })
        .catch((err) => {
          return res.status(400).json({ message: err.message });
        });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  };

  private searchRestaurant = async (req: Request, res: Response) => {
    const data = {
      name: req.body.name,
    };

    try {
      this.restaurant
        .find({ name: { $regex: data.name, $options: "i" } })
        .then((result) => {
          return res.status(200).json({ result });
        })
        .catch((err) => {
          return res.status(400).json({ message: err.message });
        });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  };
}

export default RestaurantController;
