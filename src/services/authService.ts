import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models";
import Staff from "../models/Staff";

class AuthenticateServices {
  async login({ email, password }: { email: string; password: string }) {
    try {
      const userExisted = await User.findOne({ email: email });
      if (!userExisted) {
        return {
          statusCode: 1,
          message: "Tài khoản hoặc mật khẩu không chính xác",
        };
      }

      const passwordCheck = await bcrypt.compare(
        password,
        userExisted.password
      );
      if (!passwordCheck) {
        return {
          statusCode: 2,
          message: "Tài khoản hoặc mật khẩu không chính xác ",
        };
      }

      //   Genarate JWT token
      const data = {
        email: userExisted.email,
        userId: userExisted.id,
        type: userExisted.type,
      };

      const tokenJWT = jwt.sign(
        data,
        process.env.ACCESS_TOKEN_SECRET as unknown as string,
        {
          expiresIn: "1d",
        }
      );

      const expiresIn = Math.floor(new Date().getTime() / 1000);

      if (!tokenJWT) {
        return {
          statusCode: 3,
          message: "Tạo token lỗi",
        };
      }

      return {
        statusCode: 0,
        message: "Đăng nhập thành công",
        token: tokenJWT,
        expiresIn,
      };
    } catch (error) {
      return {
        statusCode: 4,
        message: "Có lỗi xảy ra tại Login!",
      };
    }
  }

  async loginAdmin({ email, password }: { email: string; password: string }) {
    try {
      const adminExisted = await Staff.findOne({ email: email });
      if (!adminExisted) {
        return {
          statusCode: 1,
          message: "Tài khoản hoặc mật khẩu không chính xác",
        };
      }

      const passwordCheck = await bcrypt.compare(
        password,
        adminExisted.password
      );
      if (!passwordCheck) {
        return {
          statusCode: 2,
          message: "Tài khoản hoặc mật khẩu không chính xác ",
        };
      }

      //   Genarate JWT token
      const data = {
        email: adminExisted.email,
        userId: adminExisted.id,
        type: adminExisted.type,
      };

      const tokenJWT = jwt.sign(
        data,
        process.env.ACCESS_TOKEN_SECRET as unknown as string,
        {
          expiresIn: "1d",
        }
      );

      const expiresIn = Math.floor(new Date().getTime() / 1000);

      if (!tokenJWT) {
        return {
          statusCode: 3,
          message: "Tạo token lỗi",
        };
      }

      return {
        statusCode: 0,
        message: "Đăng nhập thành công",
        token: tokenJWT,
        expiresIn,
      };
    } catch (error) {
      return {
        statusCode: 4,
        message: "Có lỗi xảy ra tại Login!",
      };
    }
  }
}

export default new AuthenticateServices();
