import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import { connectToDatabase } from "./config/db";
import { APP_ORIGIN, NODE_ENV, PORT } from "./constants/env";
import cookieParser from "cookie-parser";
import cors from "cors";
import errorHandler from "./middleware/errorHandler";
import e from "express";
import catachErrors from "./utils/catachErrors";
import { OK } from "./constants/http";
import authRoutes from "./routes/auth.route";

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

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(OK).json({ status: "HELLO WORLD" });
});

// auth routes
app.use("/auth", authRoutes)

app.use(errorHandler);

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT} ${NODE_ENV} environment`);
  await connectToDatabase();
});
