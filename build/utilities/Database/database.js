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
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Connecting to database handler
const connectDB = (callback) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('connecting to DB...');
    mongoose_1.default.set('strictQuery', true);
    try {
        const connection = yield mongoose_1.default.connect(process.env.MONGO_URI);
        connection && callback();
        console.log("Connected to DB");
    }
    catch (err) {
        throw err;
        console.log(err);
    }
});
exports.default = connectDB;
