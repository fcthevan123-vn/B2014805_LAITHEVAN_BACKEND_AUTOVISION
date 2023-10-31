import { AuthService, UserService } from "../services";
import { Request, Response } from "express";

class AuthController {
  async handleLogin(req: Request, res: Response) {
    const email: string = req.query.email as string;
    const password: string = req.query.password as string;

    try {
      const response = await AuthService.login({
        email,
        password,
      });
      const expiresIn = Math.floor(new Date().getTime() / 1000);

      if (response.statusCode === 0) {
        return res
          .cookie("token", response.token, {
            sameSite: "strict",
            secure: false,
            httpOnly: true,
            path: "/",
            expires: new Date(Date.now() + expiresIn),
          })
          .status(200)
          .json({
            statusCode: response.statusCode,
            message: response.message,
          });
      }
      return res
        .cookie("token", response.token, {
          sameSite: "strict",
          secure: false,
          httpOnly: true,
          path: "/",
          expires: new Date(Date.now() + expiresIn),
        })
        .status(400)
        .json({
          statusCode: response.statusCode,
          message: response.message,
        });
    } catch (error) {
      const err = error as Error;
      return res
        .status(500)
        .json({ message: "Lỗi tại handleLogin ", err: err.message });
    }
  }

  async handleGetProfile(req: Request, res: Response) {
    // const { id } = req.user;
    const id: string = req.user?.id as unknown as string;

    if (!id) {
      return res.status(400).json({
        statusCode: 1,
        message: "Thiếu id",
      });
    }
    try {
      const response = await UserService.getProfileUser(id);
      if (response.statusCode === 0) {
        return res.status(200).json(response);
      }
      return res.status(400).json(response);
    } catch (error) {
      const err = error as Error;
      return res
        .status(500)
        .json({ message: "Error at handleGetProfile", err: err.message });
    }
  }
}

export default new AuthController();
