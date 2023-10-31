import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: { id: string };
    }
  }
}

export function checkToken(req: Request, res: Response, next: NextFunction) {
  try {
    const accessToken = req.cookies.token;
    if (!accessToken) {
      return res.status(400).json({
        statusCode: 3,
        message: "Token không hợp lệ",
      });
    }

    const tokenJWT = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET as unknown as string
    );

    if (!tokenJWT) {
      return res.status(400).json({
        statusCode: 2,
        message: "Đã có lỗi khi tạo token",
      });
    }

    req.user = {
      id: (tokenJWT as { userId: string }).userId,
    };

    next();
  } catch (error) {
    const err = error as Error;
    return res
      .status(500)
      .json({ message: "Lỗi tại handleCreateUser ", err: err.message });
  }
}
