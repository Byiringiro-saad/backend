import App from "./app";

//controllers
import userController from "./modules/user/user.controller";

const app = new App([new userController()]);

app.listen();
