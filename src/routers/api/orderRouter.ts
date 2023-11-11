import express from "express";
import validate from "../../utils/yupValidations";
import { orderValidation } from "../../utils/validations";
import { OrderController } from "../../controllers";

const router = express.Router();

// /api/v1/order

router.post(
  "/create",
  validate(orderValidation.createOrder),
  OrderController.handleCreateOrder
);

router.get(
  "/all-orders/:id",
  validate(orderValidation.getOrder),
  OrderController.handleGetOrder
);

export default router;
