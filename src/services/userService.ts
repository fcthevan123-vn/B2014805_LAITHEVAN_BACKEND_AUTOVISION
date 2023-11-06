import { User } from "../models";
import bcrypt from "bcrypt";
import { UserTypeTS } from "../utils/allTypeTs";
const saltRounds = process.env.SALT_ROUNDS as unknown as number;
const salt = bcrypt.genSaltSync(saltRounds);

class UserService {
  async createUser({
    HoTenKH,
    email,
    password,
    SoDienThoai,
    DiaChi,
  }: UserTypeTS) {
    const userExits = await User.findOne({ email: email });
    if (userExits) {
      return {
        statusCode: 1,
        message: "Người dùng đã tồn tại",
      };
    }
    const hashpassword = bcrypt.hashSync(password, salt);
    try {
      const userDoc = await User.create({
        HoTenKH,
        email,
        password: hashpassword,

        SoDienThoai,
        DiaChi,
      });

      if (!userDoc) {
        return {
          statusCode: 2,
          message: "Có lỗi xảy ra tại createUser",
        };
      }

      return {
        statusCode: 0,
        message: "Tạo người dùng thành công",
      };
    } catch (err) {
      const error = err as Error;
      return {
        statusCode: -1,
        message: error.message,
      };
    }
  }

  async getProfileUser(id: string) {
    try {
      const userExits = await User.findById(id).select("-password");
      if (!userExits) {
        return {
          statusCode: 1,
          message: "Người dùng không tồn tại",
        };
      }

      return {
        statusCode: 0,
        message: "Lấy người dùng thành công",
        data: userExits,
      };
    } catch (err) {
      const error = err as Error;
      return {
        data: "loi",
        statusCode: -1,
        message: error.message,
      };
    }
  }
}

export default new UserService();
