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

router.post(
  "/all-orders",
  validate(orderValidation.getOrder),
  OrderController.handleGetOrder
);

router.get(
  "/all-orders",
  validate(orderValidation.getOrderByAdmin),
  OrderController.handleGetOrderByAdmin
);

router.delete(
  "/delete-order/:id",
  validate(orderValidation.deleteOrder),
  OrderController.handleDeleteOrder
);

router.patch(
  "/update-order",
  validate(orderValidation.updateOrder),
  OrderController.handleUpdateOrder
);

router.patch(
  "/confirm-order",
  validate(orderValidation.confirmOrder),
  OrderController.handleConfirmOrder
);

router.patch(
  "/confirm-receive/:id",
  validate(orderValidation.confirmReceive),
  OrderController.handleConfirmReceive
);

router.get(
  "/statistic/:id",
  // validate(orderValidation.confirmReceive),
  OrderController.handleGetUserStatistic
);

export default router;
