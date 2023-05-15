import App from "./app";

//controllers
import userController from "./modules/user/user.controller";
import RestaurantController from "./modules/restaurant/restaurant.controller";

const app = new App([new userController(), new RestaurantController()]);

app.listen();
