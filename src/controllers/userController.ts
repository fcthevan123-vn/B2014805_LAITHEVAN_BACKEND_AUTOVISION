import { Request, Response } from "express";
import { UserService } from "../services";

class UserController {
  async handleCreateUser(req: Request, res: Response) {
    const { HoTenKH, email, password, SoDienThoai, DiaChi } = req.body;

    try {
      const response = await UserService.createUser({
        HoTenKH,
        email,
        password,
        SoDienThoai,
        DiaChi,
      });
      if (response.statusCode === 0) {
        return res.status(200).json(response);
      }
      return res.status(401).json(response);
    } catch (error) {
      const err = error as Error;
      return res
        .status(500)
        .json({ message: "Lỗi tại handleCreateUser ", err: err.message });
    }
  }

  async handleGetProfileUser(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const response = await UserService.getProfileUser(id);
      if (response.statusCode === 0) {
        return res.status(200).json(response);
      }
      return res.status(401).json(response);
    } catch (error) {
      const err = error as Error;
      return res
        .status(500)
        .json({ message: "Lỗi tại handleGetProfileUser", err: err.message });
    }
  }
}

export default new UserController();
