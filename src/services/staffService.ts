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
}

export default new StaffServices();
