import { Order } from "../models";

class OrderServices {
  async createOrder({
    MSKH,
    SoDonDH,
    DiaChi,
    SoDienThoai,
    HoTenKH,
  }: {
    MSKH: string;
    SoDonDH: string[];
    DiaChi: string;
    SoDienThoai: string;
    HoTenKH: string;
  }) {
    try {
      const orderDoc = await Order.create({
        MSKH,
        SoDonDH,
        DiaChi,
        SoDienThoai,
        HoTenNguoiNhan: HoTenKH,
      });

      if (!orderDoc) {
        return {
          statusCode: 1,
          message: "Đặt hàng thất bại",
        };
      }

      return {
        statusCode: 0,
        message: "Đặt hàng thành công, vui lòng đợi nhân viên xác nhận",
      };
    } catch (error) {
      const err = error as Error;
      return {
        statusCode: -1,
        message: err.message,
      };
    }
  }

  async getAllOrderByUserId(id: string) {
    try {
      const orderDoc = await Order.findById(id);

      if (!orderDoc) {
        return {
          statusCode: 1,
          message: "Lấy danh sách đặt hàng thất bại",
        };
      }

      return {
        statusCode: 0,
        message: "Lấy danh sách đặt hàng thàng công",
        data: orderDoc,
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

export default new OrderServices();
