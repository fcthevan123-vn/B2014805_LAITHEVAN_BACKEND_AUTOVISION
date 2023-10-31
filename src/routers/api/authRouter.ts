import express from "express";
import { AuthController } from "../../controllers";
import validate from "../../utils/yupValidations";
import { userValidation } from "../../utils/validations";
import { checkToken } from "../../middlewares";

const router = express.Router();

// /api/v1/auth

router.get(
  "/login",
  validate(userValidation.loginSchema),
  AuthController.handleLogin
);
router.get("/get-profile", checkToken, AuthController.handleGetProfile);

// router.post("/logout", authorizationToken, AuthenticateController.handleLogout);

export default router;
