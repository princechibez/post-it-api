"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const user_routes_1 = __importDefault(require("./user.routes"));
const auth_routes_1 = __importDefault(require("./auth.routes"));
const post_routes_1 = __importDefault(require("./post.routes"));
const generalRouter = express_1.default.Router();
// Register all server routes here
generalRouter
    .get("/", (req, res) => res.send("Welcome to POST-IT-API..."))
    .get("/docs", (req, res) => res.redirect(process.env.DOCS_URI))
    .use("/users", user_routes_1.default)
    .use(auth_routes_1.default)
    .use("/postit", post_routes_1.default);
exports.default = generalRouter;
