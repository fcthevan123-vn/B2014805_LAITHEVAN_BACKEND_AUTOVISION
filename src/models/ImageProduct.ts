import mongoose from "mongoose";
const { Schema, models } = mongoose;
// Bảng hình hàng hoá
const imageProductSchema = new Schema(
  {
    TenHinh: String,
    UrlHinh: String,
    MSHH: {
      type: String,
      allowNull: true,
    },
  },
  { timestamps: true }
);

const ImageProduct =
  models.ImageProduct || mongoose.model("ImageProduct", imageProductSchema);

export default ImageProduct;
