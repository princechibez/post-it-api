import express, { Errback, NextFunction, Request, Response } from "express";
import cors from "cors";

import { IErrorObj } from "./interfaces/error.interface";
import dotenv from "dotenv";
dotenv.config()

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

// Register all routes here
app.get("/", (req: Request, res: Response) => res.send("Welcome to POST-IT-API..."));

// Register all routes below

// catch 404 and forward to error handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: "Not found" });
});

// error handler middleware
app.use((err: IErrorObj, req: Request, res: Response, next: NextFunction) => {
  res
    .status(err.statusCode || 500)
    .json({ message: err.message, success: false });
});

export default app