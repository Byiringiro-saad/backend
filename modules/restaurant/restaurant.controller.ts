import { Request, Response, Router } from "express";

//models
import restaurantModel from "./restaurant.model";

//interfaces
import Controller from "../../interfaces/controller.interface";

//middlewares
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
    this.router.post(`/`, multerUpload.single("logo"), this.createRestaurant);
  };

  private createRestaurant = async (req: Request, res: Response) => {
    const localFilePath = req.file?.path || "";

    const { imageURL } = await cloudinary.uploadImage(localFilePath);

    const data = {
      logo: imageURL,
      name: req.body.name,
      type: req.body.type,
      menu: req.body.menu,
      location: req.body.location,
      owner_id: req.body.owner_id,
      open_time: req.body.open_time,
      full_name: req.body.full_name,
      close_time: req.body.close_time,
      owner_name: req.body.owner_name,
      owner_email: req.body.owner_email,
      owner_phone: req.body.owner_phone,
      restaurant_phone: req.body.restaurant_phone,
    };

    try {
      this.services
        .validateRestaurant(data)
        .then((result) => {
          this.services
            .createRestaurant(result)
            .then((result) => {
              return res.status(200).json({ result });
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
