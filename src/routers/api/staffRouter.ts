import express from "express";

import { AuthController, UserController } from "../../controllers";
import validate from "../../utils/yupValidations";
import { userValidation } from "../../utils/validations";
import { checkToken } from "../../middlewares";
const router = express.Router();

// /api/v1/staff

router.get(
  "/login",
  validate(userValidation.loginSchema),
  AuthController.handleLoginAdmin
);

router.get("/get-profile", checkToken, AuthController.handleGetProfileAdmin);

router.post("/all-users", checkToken, UserController.handleGetAllUserByAdmin);

router.post("/delete-user", checkToken, UserController.handleDeleteUserByAdmin);

export default router;
