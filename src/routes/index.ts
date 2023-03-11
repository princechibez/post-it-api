import express, { Request, Response } from "express"
import dotenv from "dotenv";

dotenv.config()

import userRouter from "./user.routes";
import authRouter from "./auth.routes";
import postRouter from "./post.routes";

const generalRouter = express.Router();

// Register all server routes here

generalRouter
    .get("/", (req: Request, res: Response) => res.send("Welcome to POST-IT-API..."))
    .get("/docs", (req: Request, res: Response) => res.send(process.env.DOCS_URI))
    .use("/users", userRouter)
    .use(authRouter)
    .use("/postit", postRouter)


export default generalRouter