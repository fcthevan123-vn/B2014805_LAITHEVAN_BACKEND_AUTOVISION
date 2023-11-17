import mongoose from "mongoose";
const { Schema, models } = mongoose;
// Bảng người dùng
const userSchema = new Schema(
  {
    HoTenKH: String,
    email: { type: String, trim: true },
    password: String,
    SoDienThoai: String,
    DiaChi: String,
    BiKhoa: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const User = models.User || mongoose.model("User", userSchema);

export default User;
