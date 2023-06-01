import Joi from "joi";

//interfaces
import Product from "./product.interface";

//models
import productModel from "./product.model";
import cloudinary from "../../middlewares/cloudinary";

class productService {
  private product = productModel;

  public validateProduct = async (data: any) => {
    const schema = Joi.object({
      name: Joi.string().required(),
      image: Joi.string().required(),
      price: Joi.number().required(),
      category: Joi.string().required(),
      restaurant: Joi.string().required(),
      description: Joi.string().required(),
    });

    return await schema.validateAsync(data);
  };

  public createProduct = async (data: Product) => {
    return await new this.product({
      name: data.name,
      image: data.image,
      price: data.price,
      category: data.category,
      restaurant: data.restaurant,
      ingredients: data.ingredients,
    }).save();
  };

  public createProducts = async (data: any) => {
    data.menu.map(async (item: any, index: number) => {
      const { imageURL } = await cloudinary.uploadImage(
        data?.files[index]?.localFilePath
      );

      const product = await new this.product({
        name: item.name,
        image: imageURL,
        price: item.price,
        category: item.category,
        restaurant: data.restaurant,
        ingredients: item.ingredients,
      }).save();

      return product;
    });
  };
}

export default productService;
