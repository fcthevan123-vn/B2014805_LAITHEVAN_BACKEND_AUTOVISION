/* eslint-disable @typescript-eslint/no-this-alias */
import mongoose from "mongoose";
const { Schema, models } = mongoose;
// Bảng giỏ hàng
const cartSchema = new Schema(
  {
    MSKH: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    MSHH: [{ type: mongoose.Types.ObjectId, ref: "Product" }],
    Size: String,
    MauSac: String,
    SoLuong: String,
  },
  { timestamps: true }
);

const Cart = models.Cart || mongoose.model("Cart", cartSchema);

export default Cart;
