import mongoose from "mongoose";
const { Schema, models } = mongoose;
// Bảng hàng hoá
const productSchema = new Schema(
  {
    TenHH: String,
    MoTaHH: { type: String, trim: true },
    Gia: String,
    SoLuongHang: String,
    GhiChu: String,
    ChucVu: String,
    HinhHH: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "HinhHH",
      },
    ],
  },
  { timestamps: true }
);

const Product = models.Product || mongoose.model("Product", productSchema);

export default Product;
