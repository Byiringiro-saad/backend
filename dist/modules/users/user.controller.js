"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
//models
const user_model_1 = __importDefault(require("./user.model"));
//services
const user_service_1 = __importDefault(require("./user.service"));
class UserController {
    constructor() {
        this.path = "users";
        this.user = user_model_1.default;
        this.router = (0, express_1.Router)();
        this.services = new user_service_1.default();
        this.initializeRoutes = () => {
            this.router.post(`/`, this.createUser);
        };
        this.createUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const data = {
                fname: req.body.fname,
                lname: req.body.lname,
                phone: req.body.phone,
                email: req.body.email,
                password: req.body.password,
            };
            try {
                this.services
                    .validateSignup(data)
                    .then((result) => {
                    this.services
                        .createUser(result)
                        .then((result) => {
                        const token = this.services.generateToken(result);
                        return res.status(200).json({ token });
                    })
                        .catch((err) => {
                        throw new Error(err.message);
                    });
                })
                    .catch((err) => {
                    throw new Error(err.message);
                });
            }
            catch (error) {
                return res.status(400).json({ message: error.message });
            }
        });
        this.initializeRoutes();
    }
}
exports.default = UserController;
