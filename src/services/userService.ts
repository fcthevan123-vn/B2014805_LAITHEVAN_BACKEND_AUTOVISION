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

  async updateUser(
    {
      HoTenKH,
      email,
      SoDienThoai,
      DiaChi,
    }: {
      HoTenKH: string;
      email: string;
      SoDienThoai: string;
      DiaChi: string;
    },
    id: string
  ) {
    const userExits = await User.findOne({ _id: id });
    if (!userExits) {
      return {
        statusCode: 1,
        message: "Người dùng không tồn tại",
      };
    }

    try {
      const userDoc = await User.findByIdAndUpdate(id, {
        HoTenKH,
        email,
        SoDienThoai,
        DiaChi,
      });

      console.log("userDoc", userDoc, id);

      if (!userDoc) {
        return {
          statusCode: 2,
          message: "Có lỗi xảy ra tại updateUser",
        };
      }

      return {
        statusCode: 0,
        message: "Cập nhật người dùng thành công",
      };
    } catch (err) {
      const error = err as Error;
      return {
        statusCode: -1,
        message: error.message,
      };
    }
  }

  async ChangePassword(id: string, newPassword: string, oldPassword: string) {
    try {
      const userExits = await User.findById(id);
      if (!userExits) {
        return {
          statusCode: 1,
          message: "Người dùng không tồn tại",
        };
      }

      const isComparePassword = await bcrypt.compareSync(
        oldPassword,
        userExits.password
      );

      if (!isComparePassword) {
        return {
          statusCode: 2,
          message: `Mật khẩu của bạn không đúng, vui lòng nhập đúng mật khẩu`,
        };
      }

      const hashPassword = bcrypt.hashSync(newPassword, salt);

      const updateUserPassword = await User.findByIdAndUpdate(id, {
        password: hashPassword,
      });

      if (!updateUserPassword) {
        return {
          statusCode: 2,
          message: `Thay đổi mật khẩu thất bại`,
        };
      }

      return {
        statusCode: 0,
        message: "Đổi mật khẩu thành công",
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
