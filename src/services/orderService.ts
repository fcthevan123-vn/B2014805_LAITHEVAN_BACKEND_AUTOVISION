import { Order, Product, User } from "../models";
import { ChiTietDatHangTS } from "../utils/allTypeTs";
import moment from "moment";

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

  async getAllOrderByUserId(MSKH: string, TrangThai: string) {
    try {
      let orderDoc;

      if (TrangThai == "Tất cả") {
        orderDoc = await Order.find({
          MSKH: MSKH,
        })
          .populate([
            {
              path: "SoDonDH",
              populate: {
                path: "MSHH",
              },
            },
            {
              path: "MSNV",
            },
          ])
          .sort({ createdAt: -1 });
      } else {
        orderDoc = await Order.find({
          MSKH: MSKH,
          TrangThai: TrangThai,
        })
          .populate([
            {
              path: "SoDonDH",
              populate: {
                path: "MSHH",
              },
            },
            {
              path: "MSNV",
            },
          ])
          .sort({ createdAt: -1 });
      }

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

  async getAllOrderByStatus(TrangThai: string) {
    try {
      // const orderDoc = await Order.find({
      //   TrangThai: TrangThai,
      // })
      // .populate([
      //   {
      //     path: "SoDonDH",
      //     populate: {
      //       path: "MSHH",
      //     },
      //   },
      //   {
      //     path: "MSNV",
      //   },
      //   {
      //     path: "MSKH",
      //   },
      // ])
      // .sort({ createdAt: -1 });

      let orderDoc;

      if (TrangThai == "Tất cả") {
        orderDoc = await Order.find()
          .populate([
            {
              path: "SoDonDH",
              populate: {
                path: "MSHH",
              },
            },
            {
              path: "MSNV",
            },
            {
              path: "MSKH",
            },
          ])
          .sort({ createdAt: -1 });
      } else {
        orderDoc = await Order.find({
          TrangThai: TrangThai,
        })
          .populate([
            {
              path: "SoDonDH",
              populate: {
                path: "MSHH",
              },
            },
            {
              path: "MSNV",
            },
            {
              path: "MSKH",
            },
          ])
          .sort({ createdAt: -1 });
      }

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

  async deleteOrder(id: string) {
    try {
      const orderDoc = await Order.findById(id).populate([
        {
          path: "SoDonDH",
          populate: {
            path: "MSHH",
          },
        },
        {
          path: "MSNV",
        },
        {
          path: "MSKH",
        },
      ]);

      if (!orderDoc) {
        return {
          statusCode: 1,
          message: "Không tìm thấy đơn hàng",
        };
      }

      const DonDHs: ChiTietDatHangTS[] = orderDoc.SoDonDH;

      if (orderDoc.TrangThai !== "Chờ xác nhận") {
        return {
          statusCode: 2,
          message:
            "Đơn hàng này đã được xác nhận nên không thể huỷ được, hãy liên hệ với chúng tôi để huỷ.",
        };
      }

      await Order.deleteOne({
        _id: id,
      });

      for (const DonHang of DonDHs) {
        const quantity =
          parseInt(DonHang.SoLuong) + parseInt(DonHang.MSHH.SoLuongHang);
        await Product.findByIdAndUpdate(DonHang.MSHH._id, {
          SoLuongHang: quantity,
        });
      }

      return {
        statusCode: 0,
        message: "Xoá đơn hàng thành công",
        data: orderDoc,
        DonDH: DonDHs,
      };
    } catch (error) {
      const err = error as Error;
      return {
        statusCode: -1,
        message: err.message,
      };
    }
  }

  async updateOrder(id: string, TrangThai: string, MSNV: string) {
    try {
      const orderDoc = await Order.findByIdAndUpdate(id, {
        TrangThai: TrangThai,
        MSNV: MSNV,
      }).populate([
        {
          path: "SoDonDH",
          populate: {
            path: "MSHH",
          },
        },
        {
          path: "MSNV",
        },
        {
          path: "MSKH",
        },
      ]);

      if (!orderDoc) {
        return {
          statusCode: 1,
          message: "Không tìm thấy đơn hàng",
        };
      }

      const DonDHs: ChiTietDatHangTS[] = orderDoc.SoDonDH;

      if (TrangThai == "Đã huỷ") {
        for (const DonHang of DonDHs) {
          const quantity =
            parseInt(DonHang.SoLuong) + parseInt(DonHang.MSHH.SoLuongHang);
          await Product.findByIdAndUpdate(DonHang.MSHH._id, {
            SoLuongHang: quantity,
          });
        }
      }

      return {
        statusCode: 0,
        message: "Cập nhật đơn hàng thành công",
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

  async confirmOrder(
    id: string,
    TrangThai: string,
    NgayGH: string,
    MSNV: string
  ) {
    try {
      const orderDoc = await Order.findByIdAndUpdate(id, {
        TrangThai: TrangThai,
        NgayGH: NgayGH,
        MSNV: MSNV,
      });

      if (!orderDoc) {
        return {
          statusCode: 1,
          message: "Không tìm thấy đơn hàng",
        };
      }

      return {
        statusCode: 0,
        message: "Cập nhật đơn hàng thành công",
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

  async confirmReceive(id: string) {
    try {
      const orderDoc = await Order.findByIdAndUpdate(id, {
        TrangThai: "Đã nhận hàng",
      });

      if (!orderDoc) {
        return {
          statusCode: 1,
          message: "Không tìm thấy đơn hàng",
        };
      }

      return {
        statusCode: 0,
        message: "Cập nhật đơn hàng thành công",
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

  async getUserStatistic(id: string) {
    try {
      console.log("id", id);
      const orderDoc = await Order.find({ MSKH: id })
        .populate([
          {
            path: "SoDonDH",
            populate: {
              path: "MSHH",
            },
          },
          {
            path: "MSNV",
          },
        ])
        .sort({ createdAt: -1 });

      if (!orderDoc.length) {
        return {
          statusCode: 1,
          message: "Không tìm thấy đơn hàng",
        };
      }

      const totalPay = orderDoc.reduce((acc, order) => {
        if (
          order.TrangThai === "Đã giao hàng" ||
          order.TrangThai === "Đã nhận hàng"
        ) {
          acc += order.SoDonDH.reduce(
            (orderTotal: string, DonHang: { GiaDatHang: string }) =>
              parseInt(orderTotal) + parseInt(DonHang.GiaDatHang),
            0
          );
        }
        return acc;
      }, 0);

      const totalOrder = orderDoc.length;
      const totalSucessOrder = orderDoc.filter(
        (order) =>
          order.TrangThai === "Đã giao hàng" ||
          order.TrangThai === "Đã nhận hàng"
      );

      return {
        statusCode: 0,
        message: "Lấy đơn hàng thành công",
        data: {
          totalOrder,
          totalPay,
          totalSucessOrder: totalSucessOrder.length,
        },
      };
    } catch (error) {
      console.error("Error in getUserStatistic:", error);
      return {
        statusCode: -1,
        message: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  async getAdminStatistic() {
    try {
      const orderDoc = await Order.find()
        .populate([
          {
            path: "SoDonDH",
            populate: {
              path: "MSHH",
            },
          },
          {
            path: "MSNV",
          },
        ])
        .sort({ createdAt: -1 });

      if (!orderDoc.length) {
        return {
          statusCode: 1,
          message: "Không tìm thấy đơn hàng",
        };
      }

      const dailyOrder = orderDoc.filter((order) =>
        moment(order.createdAt).isSame(moment(), "day")
      );

      const userDoc = await User.find();
      const productDoc = await Product.find();

      const totalPay = orderDoc.reduce((acc, order) => {
        if (
          order.TrangThai === "Đã giao hàng" ||
          order.TrangThai === "Đã nhận hàng"
        ) {
          acc += order.SoDonDH.reduce(
            (orderTotal: string, DonHang: { GiaDatHang: string }) =>
              parseInt(orderTotal) + parseInt(DonHang.GiaDatHang),
            0
          );
        }
        return acc;
      }, 0);

      const totalOrder = orderDoc.length;
      const totalSucessOrder = orderDoc.filter(
        (order) =>
          order.TrangThai === "Đã giao hàng" ||
          order.TrangThai === "Đã nhận hàng"
      );

      return {
        statusCode: 0,
        message: "Lấy đơn hàng thành công",
        data: {
          totalOrder,
          totalPay,
          totalSucessOrder: totalSucessOrder.length,
          allUsers: userDoc.length - 1,
          dailyOrder: dailyOrder.length,
          totalProduct: productDoc.length,
        },
      };
    } catch (error) {
      console.error("Error in getUserStatistic:", error);
      return {
        statusCode: -1,
        message: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }
}

export default new OrderServices();
