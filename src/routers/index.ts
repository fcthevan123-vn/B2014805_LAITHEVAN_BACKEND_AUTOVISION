import { Express, Request, Response } from "express";
import apiRouter from "./api";

const router = (app: Express) => {
  app.get("/", (req: Request, res: Response) => {
    res.send("AutoVision");
  });

  app.use("/api/v1", apiRouter);
};

export default router;
