import mongoose from "mongoose";
const { Schema, models } = mongoose;

// Bảng chi tiết đặt hàng

const orderDetailSchema = new Schema(
  {
    NgayDH: {
      type: Date,
      default: new Date(),
    },
    NgayGH: Date,
    TrangThaiDH: String,
    MSKH: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    MSNV: [{ type: mongoose.Types.ObjectId, ref: "Staff" }],
  },
  { timestamps: true }
);

const OrderDetail =
  models.OrderDetail || mongoose.model("OrderDetail", orderDetailSchema);

export default OrderDetail;
