import mongoose from "mongoose";
const { Schema, models } = mongoose;

// Bảng đặt hàng

const orderSchema = new Schema(
  {
    MSKH: { type: mongoose.Types.ObjectId, ref: "User" },
    MSNV: { type: mongoose.Types.ObjectId, ref: "Staff" },
    SoDonDH: [{ type: mongoose.Types.ObjectId, ref: "OrderDetail" }],
    NgayGH: Date,
    TrangThai: {
      type: String,
      default: "Chờ xác nhận",
    },
    HoTenNguoiNhan: String,
    DiaChi: String,
    SoDienThoai: String,
    NgayDH: {
      type: Date,
      default: new Date(),
    },
  },
  { timestamps: true }
);

const Order = models.Order || mongoose.model("Order", orderSchema);

export default Order;
