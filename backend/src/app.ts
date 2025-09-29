import express, { Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/healthz", (_req: Request, res: Response) => {
  res
    .status(200)
    .json({ status: "ok", uptime: process.uptime(), timestamp: new Date().toISOString() });
});

export default app;
