"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
class App {
    constructor(controllers) {
        this.listen = () => {
            this.app.listen(process.env.PORT, () => {
                console.log(`App listening on the port ${process.env.PORT}`);
            });
        };
        dotenv_1.default.config();
        this.app = (0, express_1.default)();
        //initializing
        this.connectToTheDatabase();
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
    }
    initializeMiddlewares() {
        this.app.use((0, morgan_1.default)("dev"));
        this.app.use(body_parser_1.default.json());
        this.app.use(body_parser_1.default.urlencoded({ extended: true }));
    }
    initializeControllers(controllers) {
        controllers.forEach((controller) => {
            this.app.use(`/${controller.path}`, controller.router);
        });
    }
    connectToTheDatabase() {
        mongoose_1.default.connect(`${process.env.MONGO_URI}`, {});
    }
}
exports.default = App;
