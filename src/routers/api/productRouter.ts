import express from "express";

import upload from "../../middlewares";
import { ProductController } from "../../controllers";
const router = express.Router();
// /api/v1/product

router.get("/get-products", ProductController.handleSearchProduct);

router.post(
  "/create",
  upload.array("HinhUpload", 5),
  ProductController.handleCreateProduct
);

router.post(
  "/update/:id",
  upload.array("HinhUpload", 5),
  ProductController.handleUpdateProduct
);

router.get("/all-products", ProductController.handleGetAllProducts);

router.delete("/delete/:id", ProductController.handleDeleteProduct);

router.get("/:id", ProductController.handleGetProductsById);

export default router;
