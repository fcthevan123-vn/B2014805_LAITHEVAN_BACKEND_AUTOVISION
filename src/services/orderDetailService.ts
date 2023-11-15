import { OrderDetail, Product } from "../models";
import { ChiTietDatHangTS } from "../utils/allTypeTs";

class OrderDetailServices {
  async createOrderDetail({
    MSKH,
    MSHH,
    Size,
    MauSac,
    SoLuong,
  }: ChiTietDatHangTS) {
    try {
      const productDoc = await Product.findById(MSHH._id);

      if (parseInt(productDoc.SoLuongHang) < parseInt(SoLuong)) {
        return {
          statusCode: 2,
          message:
            "Sản phẩm này không đủ số lượng như bạn đã đặt, vui lòng chọn lại.",
        };
      }

      const tongGia = parseInt(MSHH.Gia) * parseInt(SoLuong);

      const orderDetailDoc = await OrderDetail.create({
        MSKH,
        MSHH,
        Size,
        MauSac,
        SoLuong,
        GiaDatHang: tongGia,
      });

      const quantityRemain =
        parseInt(productDoc.SoLuongHang) - parseInt(SoLuong);

      const updateProduct = await Product.findByIdAndUpdate(productDoc._id, {
        SoLuongHang: quantityRemain,
      });

      if (!updateProduct) {
        return {
          statusCode: 3,
          message: "Cập nhật sản phẩm thất bại",
        };
      }

      if (!orderDetailDoc) {
        return {
          statusCode: 1,
          message: "Tạo chi tiết đặt hàng thất bại",
        };
      }

      return {
        statusCode: 0,
        message: "Tạo chi tiết đặt hàng thành công",
        data: orderDetailDoc,
      };
    } catch (error) {
      const err = error as Error;
      return {
        statusCode: -1,
        message: err.message,
      };
    }
  }
}
export default new OrderDetailServices();
