import * as yup from "yup";

const userValidation = {
  createUser: yup.object({
    body: yup.object({
      email: yup.string().email().required("Điền thiếu email"),
      SoDienThoai: yup.number().required("Điền thiếu email"),
      DiaChi: yup.string().required("Điền thiếu địa chỉ"),
      password: yup.string().required("Thiếu mật khẩu"),
    }),
  }),
  getProfile: yup.object({
    params: yup.object({
      id: yup.string().required("Thiếu id người dùng"),
    }),
  }),
  updateProfile: yup.object({
    body: yup.object({
      HoTenKH: yup.string().required("Điền thiếu họ tên"),
      email: yup.string().email().required("Điền thiếu email"),
      SoDienThoai: yup.string().required("Điền thiếu số điện thoại"),
      DiaChi: yup.string().required("Điền thiếu địa chỉ"),
      id: yup.string().required("Thiếu id người dùng"),
    }),
  }),
  changePassword: yup.object({
    body: yup.object({
      oldPassword: yup
        .string()
        .min(8, "Mật khẩu cũ phải có ít nhất 8 ký tự")
        .required("Điền thiếu họ tên"),
      newPassword: yup
        .string()
        .min(8, "Mật khẩu mới phải có ít nhất 8 ký tự")
        .required("Điền thiếu họ tên"),
      id: yup.string().required("Thiếu id người dùng"),
    }),
  }),
  loginSchema: yup.object({
    query: yup.object({
      email: yup.string().email().required("Thiếu email"),
      password: yup.string().required("Thiếu mật khẩu"),
    }),
  }),
};

export default userValidation;
