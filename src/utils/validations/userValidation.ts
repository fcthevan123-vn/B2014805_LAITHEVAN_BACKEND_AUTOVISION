import * as yup from "yup";

const userValidation = {
  createUser: yup.object({
    body: yup.object({
      email: yup.string().email().required("Điền thiếu email"),
      phone: yup.number().required("Điền thiếu email"),
      address: yup.string().required("Điền thiếu địa chỉ"),
      password: yup.string().required("Thiếu mật khẩu"),
    }),
  }),
  getProfile: yup.object({
    params: yup.object({
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
