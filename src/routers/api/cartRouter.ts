import express from "express";
import { CartController } from "../../controllers";
import validate from "../../utils/yupValidations";
import { cartValidation } from "../../utils/validations";

const router = express.Router();

// /api/v1/cart

router.post(
  "/add-to-cart",
  validate(cartValidation.addToCart),
  CartController.handleAddToCart
);

router.delete(
  "/remove-from-cart/:id",
  validate(cartValidation.removeFromCart),
  CartController.handleRemoveFromCart
);

router.patch(
  "/update",
  validate(cartValidation.updateCart),
  CartController.handleUpdateCart
);

router.get(
  "/:id",
  validate(cartValidation.getCart),
  CartController.handleGetCartByUserId
);

export default router;
