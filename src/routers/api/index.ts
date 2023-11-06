import userRouter from "./userRouter";
import authRouter from "./authRouter";
import productRouter from "./productRouter";
import staffRouter from "./staffRouter";

import express from "express";
const router = express.Router();

router.use("/user", userRouter);
router.use("/auth", authRouter);
router.use("/product", productRouter);
router.use("/staff", staffRouter);

export default router;
