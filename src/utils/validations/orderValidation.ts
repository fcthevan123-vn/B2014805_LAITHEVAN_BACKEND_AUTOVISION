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
    params: yup.object({
      id: yup.string().required("Điền thiếu MSKH"),
    }),
  }),
};

export default orderValidation;
