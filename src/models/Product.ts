/* eslint-disable @typescript-eslint/no-this-alias */
import mongoose from "mongoose";
import ImageProduct from "./ImageProduct";
const { Schema, models } = mongoose;
// Bảng hàng hoá
const productSchema = new Schema(
  {
    TenHH: String,
    MoTaHH: { type: String, trim: true },
    Gia: String,
    SoLuongHang: String,
    GhiChu: String,
    TrongLuong: String,
    ChatLieu: String,
    PhuHopVoi: String,
    CongNgheDem: String,
    DeNgoai: String,
    NoiBat: { type: Boolean, default: false },
    HinhHH: [{ type: mongoose.Types.ObjectId, ref: "ImageProduct" }],
  },
  { timestamps: true }
);

const Product = models.Product || mongoose.model("Product", productSchema);

export default Product;
