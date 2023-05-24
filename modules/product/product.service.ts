import Joi from "joi";

//interfaces
import Product from "./product.interface";

//models
import productModel from "./product.model";

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
}

export default productService;
