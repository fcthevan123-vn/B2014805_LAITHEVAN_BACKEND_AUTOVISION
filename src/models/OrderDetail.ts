import mongoose from "mongoose";
const { Schema, models } = mongoose;

// Bảng chi tiết đặt hàng

const orderDetailSchema = new Schema(
  {
    MSKH: { type: mongoose.Types.ObjectId, ref: "User" },
    MSHH: { type: mongoose.Types.ObjectId, ref: "Product" },
    Size: String,
    MauSac: String,
    SoLuong: String,
    GiaDatHang: String,
    GiamGia: {
      type: String,
      default: 0,
    },
  },
  { timestamps: true }
);

const OrderDetail =
  models.OrderDetail || mongoose.model("OrderDetail", orderDetailSchema);

export default OrderDetail;
