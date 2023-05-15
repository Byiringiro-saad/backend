import Joi from "joi";

//model
import userModel from "../user/user.model";
import restaurantModel from "./restaurant.model";

class RestaurantServices {
  private user = userModel;
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

  public createRestaurant = async (data: any) => {
    const user = await this.user.findOneAndUpdate(
      { _id: data.owner_id },
      { role: "admin" },
      { new: true }
    );

    return await new this.restaurant({
      name: data.name,
      type: data.type,
      logo: data.logo,
      owner_id: user?._id,
      location: data.location,
      open_time: data.open_time,
      full_name: data.full_name,
      close_time: data.close_time,
      owner_name: data.owner_name,
      owner_email: data.owner_email,
      owner_phone: data.owner_phone,
      restaurant_phone: data.restaurant_phone,
    }).save();
  };
}

export default RestaurantServices;
