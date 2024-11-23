import "dotenv/config";
import express, { Request, Response } from "express";
import { connectToDatabase } from "./config/db";
import { APP_ORIGIN, NODE_ENV, PORT } from "./constants/env";
import cookieParser from "cookie-parser";
import cors from "cors";
import errorHandler from "./middleware/errorHandler";

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(
  cors({
    origin: APP_ORIGIN,
    credentials: true,
  })
);

app.get("/", (req: Request, res: Response) => {
    throw new Error("This is a test Error")
  res.status(200).json({ status: "HHELLO WORKD" });
});

app.use(errorHandler);

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT} ${NODE_ENV} environment`);
  await connectToDatabase();
});
