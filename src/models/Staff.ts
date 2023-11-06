import mongoose from "mongoose";
const { Schema, models } = mongoose;
// Bảng nhân viên
const staffSchema = new Schema(
  {
    HoTenNV: String,
    email: { type: String, trim: true },
    password: String,
    SoDienThoai: String,
    DiaChi: String,
    ChucVu: String,
  },
  { timestamps: true }
);

const Staff = models.Staff || mongoose.model("Staff", staffSchema);

export default Staff;
