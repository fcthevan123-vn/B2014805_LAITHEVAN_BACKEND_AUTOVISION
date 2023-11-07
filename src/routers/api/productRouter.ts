import express from "express";

import upload from "../../middlewares";
import { ProductController } from "../../controllers";
const router = express.Router();
// /api/v1/product
router.post(
  "/create",
  upload.array("HinhUpload", 5),
  ProductController.handleCreateProduct
);

router.get("/all-products", ProductController.handleGetAllProducts);

export default router;
