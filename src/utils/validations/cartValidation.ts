import * as yup from "yup";

const cartValidation = {
  addToCart: yup.object({
    body: yup.object({
      MauSac: yup.string().required("Điền thiếu màu sắc"),
      Size: yup.number().required("Điền thiếu size"),
      SoLuong: yup.number().required("Điền thiếu Số lượng"),
      MSKH: yup.string().required("Điền thiếu MSKH"),
      MSHH: yup.string().required("Điền thiếu MSHH"),
    }),
  }),
  removeFromCart: yup.object({
    params: yup.object({
      id: yup.string().required("Điền thiếu id cart"),
    }),
  }),
  getCart: yup.object({
    params: yup.object({
      id: yup.string().required("Điền thiếu id người dùng"),
    }),
  }),
};

export default cartValidation;
