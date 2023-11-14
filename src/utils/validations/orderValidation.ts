import * as yup from "yup";

const orderValidation = {
  createOrder: yup.object({
    body: yup.object({
      MSKH: yup.string().required("Điền thiếu MSKH"),
      DonHang: yup.array().required("Điền thiếu DonHang"),
      HoTenKH: yup.string().required("Điền thiếu HoTenKH"),
      DiaChi: yup.string().required("Điền thiếu DiaChi"),
      SoDienThoai: yup.string().required("Điền thiếu SoDienThoai"),
    }),
  }),
  getOrder: yup.object({
    body: yup.object({
      MSKH: yup.string().required("Điền thiếu MSKH"),
      TrangThai: yup.string().required("Điền thiếu trạng thái"),
    }),
  }),
  getOrderByAdmin: yup.object({
    query: yup.object({
      TrangThai: yup.string().required("Điền thiếu trạng thái"),
    }),
  }),

  deleteOrder: yup.object({
    params: yup.object({
      id: yup.string().required("Điền thiếu mã số đơn hàng"),
    }),
  }),
  updateOrder: yup.object({
    body: yup.object({
      id: yup.string().required("Điền thiếu mã số đơn hàng"),
      TrangThai: yup.string().required("Điền thiếu trạng thái"),
      MSNV: yup.string().required("Điền thiếu MSNV"),
    }),
  }),
  confirmOrder: yup.object({
    body: yup.object({
      id: yup.string().required("Điền thiếu mã số đơn hàng"),
      TrangThai: yup.string().required("Điền thiếu trạng thái"),
      NgayGH: yup.string().required("Điền thiếu ngày giao hàng"),
      MSNV: yup.string().required("Điền thiếu MSNV"),
    }),
  }),
  confirmReceive: yup.object({
    params: yup.object({
      id: yup.string().required("Điền thiếu mã số đơn hàng"),
    }),
  }),
};

export default orderValidation;
