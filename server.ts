import App from "./app";

//controllers
import userController from "./modules/user/user.controller";
import cartController from "./modules/cart/cart.controller";
import SeatController from "./modules/seat/seat.controller";
import orderController from "./modules/order/order.controller";
import productController from "./modules/product/product.controller";
import RestaurantController from "./modules/restaurant/restaurant.controller";

const app = new App([
  new userController(),
  new cartController(),
  new SeatController(),
  new orderController(),
  new productController(),
  new RestaurantController(),
]);

app.listen();
