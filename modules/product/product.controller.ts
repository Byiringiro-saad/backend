import { Request, Response, Router } from "express";

//models
import productModel from "./product.model";

//services
import productService from "./product.service";

//middlewares
import cloudinary from "../../middlewares/cloudinary";
import { multerUpload } from "../../middlewares/multer";

//interfaces
import Controller from "../../interfaces/controller.interface";

class productController implements Controller {
  public path = "products";
  public router = Router();
  public product = productModel;
  public service = new productService();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes = () => {
    this.router.get(`/:id`, this.getProduct);
    this.router.get(`/`, this.getAllProducts);
    this.router.post(`/many`, this.createProducts);
    this.router.post(`/`, multerUpload.single("image"), this.createProduct);
  };

  private createProducts = async (req: Request, res: Response) => {
    const data = {
      // files: req.files,
      menu: req.body.menu,
      restaurant: req.body.restaurant,
    };

    try {
      this.service
        .createProducts(data)
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

  private createProduct = async (req: Request, res: Response) => {
    const localFilePath = req.file?.path || "";

    const { imageURL } = await cloudinary.uploadImage(localFilePath);

    const data = {
      image: imageURL,
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
      restaurant: req.body.restaurant,
      description: req.body.description,
    };

    try {
      this.service
        .validateProduct(data)
        .then((result) => {
          this.service
            .createProduct(result)
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

  private getAllProducts = async (req: Request, res: Response) => {
    try {
      this.product
        .find({})
        .then((result) => {
          return res.status(200).json({ result });
        })
        .catch((err) => {
          throw new Error(err.message);
        });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  };

  private getProduct = async (req: Request, res: Response) => {
    const data = {
      _id: req.params.id,
    };

    try {
      this.product
        .findOne(data)
        .then((result) => {
          return res.status(200).json({ result });
        })
        .catch((err) => {
          throw new Error(err.message);
        });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  };
}

export default productController;
