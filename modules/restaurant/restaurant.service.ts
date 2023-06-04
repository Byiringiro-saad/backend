import Joi from "joi";

//model
import userModel from "../user/user.model";
import restaurantModel from "./restaurant.model";

class RestaurantServices {
  private user = userModel;
  private product = restaurantModel;
  private restaurant = restaurantModel;

  public validateRestaurant = async (data: any) => {
    const schema = Joi.object({
      logo: Joi.string().required(),
      name: Joi.string().required(),
      type: Joi.string().required(),
      location: Joi.string().required(),
      owner_id: Joi.string().required(),
      open_time: Joi.string().required(),
      full_name: Joi.string().required(),
      close_time: Joi.string().required(),
      owner_name: Joi.string().required(),
      owner_email: Joi.string().required(),
      owner_phone: Joi.string().required(),
      restaurant_phone: Joi.string().required(),
    });

    return await schema.validateAsync(data);
  };

  public createRestaurantOne = async (data: any) => {
    const user = await this.user.findOneAndUpdate(
      { _id: data.owner_id },
      { role: "admin" },
      { new: true }
    );

    const restaurant = await new this.restaurant({
      name: data.name,
      owner_id: user?._id,
      full_name: data.full_name,
      owner_name: data.owner_name,
      owner_email: data.owner_email,
      owner_phone: data.owner_phone,
      restaurant_phone: data.restaurant_phone,
    }).save();

    return restaurant;
  };

  public createRestaurantTwo = async (data: any) => {
    const restaurant = await this.restaurant.findOneAndUpdate(
      { _id: data.restaurant },
      {
        // logo: data.logo,
        type: data.type,
        location: data.location,
        open_time: data.opening,
        close_time: data.closing,
      }
    );

    return restaurant;
  };
}

export default RestaurantServices;
