import express, { Errback, NextFunction, Request, Response } from "express";
import cors from "cors";

import generalRouter from "./routes";
import { IErrorObj } from "./interfaces/error.interface";

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

// Register all routes below
app.use("/api/v1", generalRouter)


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

// NB: Server listening is not done here, rather in ../bin/www.ts

export default app