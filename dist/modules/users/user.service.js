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
const joi_1 = __importDefault(require("joi"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//models
const user_model_1 = __importDefault(require("./user.model"));
class UserServices {
    constructor() {
        this.user = user_model_1.default;
        this.validateSignup = (data) => __awaiter(this, void 0, void 0, function* () {
            const schema = joi_1.default.object({
                fname: joi_1.default.string().required(),
                lname: joi_1.default.string().required(),
                phone: joi_1.default.string().required(),
                email: joi_1.default.string().required(),
                password: joi_1.default.string().required(),
            });
            return yield schema.validateAsync(data);
        });
        this.createUser = (data) => __awaiter(this, void 0, void 0, function* () {
            const hashedPassword = yield bcryptjs_1.default.hash(data.password, 10);
            return yield new this.user({
                fname: data.fname,
                lname: data.lname,
                phone: data.phone,
                email: data.email,
                password: hashedPassword,
            }).save();
        });
        this.generateToken = (data) => __awaiter(this, void 0, void 0, function* () {
            const token = jsonwebtoken_1.default.sign({ _id: data._id }, `${process.env.JWT_SECRET}`);
            return token;
        });
    }
}
exports.default = UserServices;
