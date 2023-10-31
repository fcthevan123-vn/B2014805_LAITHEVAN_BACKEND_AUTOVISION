import express from "express";
import userController from "../../controllers/userController";
import { userValidation } from "../../utils/validations";
import validate from "../../utils/yupValidations";

const router = express.Router();
// /api/v1/user
router.get(
  "/create",
  validate(userValidation.createUser),
  userController.handleCreateUser
);

router.get(
  "/:id",
  validate(userValidation.getProfile),
  userController.handleGetProfileUser
);

export default router;
