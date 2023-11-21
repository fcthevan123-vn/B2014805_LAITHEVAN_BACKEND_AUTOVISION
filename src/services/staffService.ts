import { User } from "../models";
import Staff from "../models/Staff";

class StaffServices {
  async getProfileStaff(id: string) {
    try {
      const staffExit = await Staff.findById(id).select("-password");

      if (!staffExit) {
        return {
          statusCode: 1,
          message: "Người dùng không tồn tại",
        };
      }

      return {
        statusCode: 0,
        message: "Lấy người dùng thành công",
        data: staffExit,
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

  async getAllUser(id: string) {
    try {
      const staffExit = await Staff.findById(id).select("-password");

      if (staffExit.ChucVu !== "Admin") {
        return {
          statusCode: 2,
          message: "Bạn không phải là người quản lý",
        };
      }

      if (!staffExit) {
        return {
          statusCode: 1,
          message: "Người dùng không tồn tại",
        };
      }

      const userDoc = await User.find().select("-password");

      return {
        statusCode: 0,
        message: "Lấy danh sách tài khoản thành công",
        data: userDoc,
      };
    } catch (err) {
      const error = err as Error;
      return {
        statusCode: -1,
        message: error.message,
      };
    }
  }

  async LockUser(id: string, userId: string, status: boolean) {
    try {
      const staffExit = await Staff.findById(id).select("-password");

      if (staffExit.ChucVu !== "Admin") {
        return {
          statusCode: 2,
          message: "Bạn không phải là người quản lý",
        };
      }

      if (!staffExit) {
        return {
          statusCode: 1,
          message: "Người dùng không tồn tại",
        };
      }

      const userDoc = await User.findByIdAndUpdate(userId, {
        BiKhoa: status,
      });

      if (!userDoc) {
        return {
          statusCode: 3,
          message: "Không tìm thấy người dùng",
        };
      }

      return {
        statusCode: 0,
        message: !status
          ? "Mở khoá người dùng thành công"
          : "Khoá người dùng thành công",
      };
    } catch (err) {
      const error = err as Error;
      return {
        statusCode: -1,
        message: error.message,
      };
    }
  }
}

export default new StaffServices();
