import userRouter from "./userRouter";
import authRouter from "./authRouter";
import productRouter from "./productRouter";
import staffRouter from "./staffRouter";
import cartRouter from "./cartRouter";
import orderRouter from "./orderRouter";
import express from "express";
const router = express.Router();

router.use("/user", userRouter);
router.use("/auth", authRouter);
router.use("/product", productRouter);
router.use("/staff", staffRouter);
router.use("/cart", cartRouter);
router.use("/order", orderRouter);

export default router;
