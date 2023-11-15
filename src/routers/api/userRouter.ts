import express from "express";
import userController from "../../controllers/userController";
import { userValidation } from "../../utils/validations";
import validate from "../../utils/yupValidations";

const router = express.Router();
// /api/v1/user
router.post(
  "/create",
  validate(userValidation.createUser),
  userController.handleCreateUser
);

router.get(
  "/:id",
  validate(userValidation.getProfile),
  userController.handleGetProfileUser
);

router.patch(
  "/update",
  validate(userValidation.updateProfile),
  userController.handleUpdateProfile
);

router.patch(
  "/change-password",
  validate(userValidation.changePassword),
  userController.handleChangePassword
);

export default router;
