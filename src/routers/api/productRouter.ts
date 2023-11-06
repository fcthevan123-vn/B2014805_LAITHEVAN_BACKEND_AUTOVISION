import express from "express";

import upload from "../../middlewares";
import { ProductController } from "../../controllers";
const router = express.Router();
// /api/v1/product
router.post(
  "/create",
  upload.array("images", 5),
  ProductController.handleCreateProduct
);

export default router;
