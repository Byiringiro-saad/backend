import App from "./app";

//controllers
import userController from "./modules/users/user.controller";

const app = new App([new userController()]);

app.listen();
